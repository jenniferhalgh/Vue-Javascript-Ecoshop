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
        const order = {
            items: [],
            total_sum: req.body.total_sum,
            customers: req.body.customers
        };
        ShoppingCart.findById({ _id: customer.shoppingCart}, function(err, shoppingCart) {
            if (err) { return res.status(500).send(err);}
            if (shoppingCart == null) {
                return res.status(404).json({"message": "No shopping cart"});
            }
            while(shoppingCart.items.length > 0) {
                var item = shoppingCart.items.pop();
                console.log(order)
                console.log(order.items)
                order.items.push(item)
            }
            shoppingCart.save() 
           console.log(order)
        var newOrder = new Order(order)
        newOrder.save(
        );
        customer.orders.push(newOrder);
        customer.save();
        return res.status(201).json(customer.orders);


        })

        
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

//get customer's specific order
router.get('/customers/:customers_id/orders/:order_id', function(req, res){
    var id = req.params.customers_id;
    Customer.findById(id).populate({path: "orders", match: {_id: req.params.order_id} }).exec(function(err, customer){
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