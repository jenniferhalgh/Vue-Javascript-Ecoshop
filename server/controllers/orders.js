var express = require("express");
var router = express.Router();
const Item = require("../models/item");
var Order = require("../models/order");
const Store = require("../models/store");


//store customer's orders
router.post("/orders", function(req, res){
    var orders = new Order(req.body);
    orders.save(function(err) {
        if (err) { return res.status(500).send(err);}
        res.status(201).json(orders);
        console.log(orders);
    });
});
//get customer's orders
router.get('/orders', function(req, res){
    Order.find(function(err, orders){
        if(err){return res.status(500).send(err);}
        res.status(200).json({"orders": orders});
    });
});

module.exports = router;