var express = require("express");
const Customer = require("../models/customer");
const PaymentInfo = require("../models/paymentInfo");
var router = express.Router();

//List all customers
router.get('/customers', function(req, res){
    Customer.find(function(err, customers){
        if(err){return res.status(500).send(err);}
        res.status(200).json({"customers": customers});
    });
});

//List a customer with a specific id
router.get('/customers/:id', function(req, res){
    var id = req.params.id;
    Customer.findById(id).populate("paymentInfos").exec(function(err, customer){
    if (err) {return res.status(500).send(err);}
    if (customer == null) {
        return res.status(404).json({"message": "Customer not found"});
    }
    res.status(200).send(customer);
    })
});

//Create new customer
router.post("/customers", function(req, res){
    var customer = new Customer(req.body);
    customer.save(function(err) {
        if (err) { return res.status(500).send(err);}
        res.status(201).json(customer);
        console.log(customer);
    });
});

//Updates partial info of a specific customer
router.patch("/customers/:id", (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, function(err, customer){
        if (err) {return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
          }
          res.status(204).send(customer);
    });
  });

  //Replace all info of a specific customer
  router.put('/customers/:id', function(req, res) {
    var id = req.params.id;
    Customer.findOneAndReplace({_id: id}, req.body, {option: true}, function(err, customer){
        if (err) { return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
    
        res.status(200).json(customer);
    });
});

//Delete a customer
router.delete('/customers/:id', function(req, res) {
    var id = req.params.id;
    Customer.findOneAndDelete({_id: id}, function(err, customer) {
        if (err) { return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
        res.status(204).json(customer);
    });
});

//Show the items in the shopping cart
router.get('/customers/:id/shoppingCart', function(req, res){
    var id = req.params.id;
    Customer.findById(id).populate("items").exec(function(err, customer){
    if (err) {return res.status(500).send(err);}
    if (customer == null) {
        return res.status(404).json({"message": "Customer not found"});
    }
    res.status(200).send(customer);
    })
});

module.exports = router;