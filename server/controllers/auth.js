var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const Customer = require("../models/customer")
const jwt = require('jsonwebtoken');

router.post("/customers", async (req, res) => {

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
        shoppingCart: null,
        orders: [],
        paymentInfos: []})
        
        console.log(newCustomer);
        newCustomer.save();
return res.status(201).json(newCustomer);
}
)
   

// Login
router.post("/login", (req, res) => {
});

router.post('/customers/login', (req, res, next) => {
    Customer.findOne({email: req.body.email }, function(err, customer){
      if (err) return res.status(500).send(err);
      if (customer==null) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        })
      }
      //incorrect password
      if (!bcrypt.compare(req.body.password,customer.account.password)) {
        return res.status(401).json({
          title: 'login failed',
          error: 'invalid credentials'
        })
      }
      //IF ALL IS GOOD create a token and send to frontend
      try {
      let token = jwt.sign({ customerId: customer._id}, 'secretkey');
      return res.status(200).json({
        title: 'login sucess',
        token: token
      })
    } 
    catch (err) {
      return res.status(400).json({
        title: 'error',
        error: 'Unable To Login'
      })
    }
    })
  })

  //grabbing user info
  router.get('/customer', (req, res, next) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      //token is valid
      user.findOne({ _id: decoded.userId }, (err, user) => {
        if (err) return console.log(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            location: user.location,
            email: user.email,
            id: user.id
          }
        })
      })
    })
})

module.exports = router;
