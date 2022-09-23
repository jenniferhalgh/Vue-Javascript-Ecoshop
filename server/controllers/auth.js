var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const Customer = require("../models/customer")
const ShoppingCart = require("../models/shoppingCart")
const jwt = require('jsonwebtoken');

router.post("/customers", async (req, res) => {

var shoppingCart = new ShoppingCart(req.body);
shoppingCart.save(function(err) {
  if (err) { return res.status(500).send(err);}
  console.log(shoppingCart);
  
});
let jwttoken = jwt.sign({ customerId: req.body._id}, 'token_key');
    const newCustomer = new Customer({
    
        name: {
            firstname: req.body.name.firstname,
            lastname: req.body.name.lastname},
        account: {
            username: req.body.account.username,
            password: bcrypt.hashSync(req.body.account.password, 10)
        },
        email: req.body.email,
        phone: req.body.phone,
        personalNumber: req.body.personalNumber,
        adress: req.body.adress,
        shoppingCart: shoppingCart,
        orders: [],
        paymentInfos: [],
        _id:req.body._id,
        token: jwttoken
    })
        newCustomer.save(function(err) {
          if (err) { return res.status(500).send(err);}
          console.log(newCustomer);
        });
      return res.status(201).json(newCustomer);
}
)

router.post('/customers/login', (req, res, next) => {
    Customer.findOne({email: req.body.email }, function(err, customer){
      if (err) return res.status(500).send(err);
      if (customer==null) {
        return res.status(401).json({
          title: 'User not found',
          error: 'Invalid email'
        })
      }
      //incorrect password
      if (!bcrypt.compare(req.body.password,customer.account.password)) {
        return res.status(401).json({
          title: 'Failed to login:',
          error: 'Invalid password'
        })
      }
      
      try {
      let token = jwt.sign({ customerId: customer._id}, 'token_key');
      return res.status(200).json({
        title: 'Log in success',
        token: token
      })
    } 
    catch (err) {
      return res.status(400).json({
        title: 'Error',
        error: 'Unable To Login'
      })
    }
    })
  })

  //getting the customer
  router.get('/customer', (req, res, next) => {
    let token = req.headers.token; //token
    console.log(token)
    jwt.verify(token, 'secretkey', (err, decoded) => {
      console.log(decoded)
      console.log(token)
      console.log(err)

      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      
      Customer.findById(decoded.customerId, function (err, customer){
        if (err) return console.log(err) 
        return res.status(200).send(customer)
      })
    })
})

module.exports = router;
