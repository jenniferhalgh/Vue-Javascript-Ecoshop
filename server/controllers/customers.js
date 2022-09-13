var express = require("express");
const Customer = require("../models/customer");
const PaymentInfo = require("../models/paymentInfo");
var app = express.Router();

//List all customers
app.get('/api/customers', function(req, res){
    Customer.find(function(err, customers){
        if(err){return res.status(500).send(err);}
        /*res.json({"customers": customers})
        res.status(200);*/
        res.status(200).json({"customers": customers});
    })
});

//List a customer with a specific id
app.get('/api/customers/:id', function(req, res){
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
app.post('/api/customers', function(req, res){
    var customer = new Customer(req.body);
    customer.save(function(err) {
        if (err) { return res.status(500).send(err);}
        res.status(201).json(customer);
    });
});

//Updates partial info of a specific customer
app.patch("/api/customers/:id", (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, function(err, customer){
        if (err) {return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
          }
          res.status(204).send(customer);
    })
  });

  //Update
  app.put('api/customers/:id', function(req, res, next) {
    var id = req.params.id;
    Customer.findById(id, function(err, customer) {
        if (err) { return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
        customer.
        customer.save();
        res.status(200).json(customer);
    });
});

//Delete a customer
app.delete('/api/customer/:id', function(req, res) {
    var id = req.params.id;
    Customer.findOneAndDelete({_id: id}, function(err, customer) {
        if (err) { return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
        res.status(204).json(customer);
    });
});

//Delete all customers
app.delete('/api/customer', function(req, res){
Customer.deleteMany(function(err, customers){
    if(err){return res.status(500).send(err);}
    res.status(204).json(customers);
})
});
