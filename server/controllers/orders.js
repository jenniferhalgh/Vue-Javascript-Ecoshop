var express = require("express");
var router = express.Router();
const Item = require("../models/item");
const Customer = require("../models/customer");
var Order = require("../models/order");
const Store = require("../models/store");
const ShoppingCart = require("../models/shoppingCart");


//create customer's order
router.post("/customers/:id/orders", function(req, res){
    var id = req.params.id;
    Customer.findById(id, function(err, customer){
        if (err) {return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
            
        }
        var order = new Order(req.body);
        order.save(
            function(err) { 
            if (err) {return res.status(500)}
            console.log(order);}
        );
        ShoppingCart.findById({ _id: customer.shoppingCart}, function(err, shoppingCart) {
            if (err) { return res.status(500).send(err);}
            if (shoppingCart == null) {
                return res.status(404).json({"message": "No shopping cart"});
            }
            while(shoppingCart.items.length > 0) {
                shoppingCart.items.pop();
            }
            shoppingCart.save()
        })
        
        customer.orders.push(order);
        customer.save();
        return res.status(201).json(customer.orders);
    });
});
//get customer's order
router.get('/customers/:customers_id/orders', function(req, res){
    var id = req.params.customers_id;
    Customer.findById(id).populate("orders").exec(function(err, customer){
    if (err) {return res.status(500).send(err);}
    if (customer == null) {
        return res.status(404).json({"message": "Customer not found"});
    }
    res.status(200).send(customer.orders);
    })
});

//gets all orders
router.get('/orders', function(req, res){
    Order.find(function(err, order){
        if(err){return res.status(500).send(err);}
        res.status(200).json({"orders": order});
    });
});
module.exports = router;