var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const Customer = require("../models/customer")
const ShoppingCart = require("../models/shoppingCart")
const jwt = require('jsonwebtoken');

router.post("/customers", async (req, res) => {

  const registeredCustomer = await Customer.findOne({email: req.body.email}, function(err, regCustomer){
    if(err){res.status(500).send(err)}
     if (regCustomer) {
      return res.status(409).json({
        title: 'Cannot register',
        error: 'This email is already linked to an account, please log in instead'
      })
    }
    console.log(regCustomer)
  })

  if(!registeredCustomer){
var shoppingCart = new ShoppingCart(req.body);

let jwttoken = jwt.sign({ customer_Id: req.body._id}, 'token_key', {
  expiresIn: "2h"
});

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
        shoppingCart.save(function(err) {
          if (err) { return res.status(500).send(err);}
          console.log(shoppingCart);
        })

      return res.status(201).json(newCustomer);
  }
}
)

router.post('/customers/login', (req, res, next) => {

      if (!(req.body.email && req.body.password)) {
        res.status(400).json({
          title: 'Blank field(s)',
          error: 'All input is required'
        });
      }

    Customer.findOne({email: req.body.email }, async function(err, customer){
      if (err) return res.status(500).send(err);
      if (customer==null) {
        return res.status(401).json({
          title: 'User not found',
          error: 'Invalid email'
        })
      }
      
      //incorrect password
      if (await bcrypt.compare(req.body.password, customer.account.password)==false) {
        return res.status(401).json({
          title: 'Failed to login:',
          error: 'Invalid password'
        })
      }
      
      try {
      let token = jwt.sign({ customer_Id: customer._id}, 'token_key', {
        expiresIn: "2h",
      });
      customer.token = token
      return res.status(200).json({
        title: 'Log in success',
        token: token
      })
    } 
    catch (err) {
      return res.status(400).send({
        title: 'Error',
        error: 'Unable To Login'
      })
    }
    })
  })

  //getting the customer
  router.get('/customer', (req, res, next) => {
    jwt.verify(req.headers.token, 'token_key', (err, decoded) => {
      console.log(decoded)
      console.log(req.headers.token)
      console.log(err)

      if (err) return res.status(401).json({
        title: 'Unauthorized'
      })
      
      Customer.findById(decoded.customer_Id, function (err, customer){
        if (err) {return res.status(500).json({title: 'Error'})}
        if(customer==null){return res.status(404).json({title: 'Customer not found'})}
        return res.status(200).json(customer)
      })
    })
})

module.exports = router;
