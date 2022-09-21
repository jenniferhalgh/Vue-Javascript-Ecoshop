var express = require("express");
const Customer = require("../models/customer");
const PaymentInfo = require("../models/paymentInfo");
const ShoppingCart = require("../models/shoppingCart");
const Item = require("../models/item");
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

/*//Create new customer
router.post("/customers", function(req, res){
    var customer = new Customer(req.body);
    customer.save(function(err) {
        if (err) { return res.status(500).send(err);}
        res.status(201).json(customer);
        console.log(customer);
    });
});*/

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


//Get shopping cart
router.get('/customers/:id/shoppingCart', function(req, res){
        var id = req.params.id;
        Customer.findById(id).populate("shoppingCart").exec(function(err, customer){
        if (err) {return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
        res.status(200).send(customer.shoppingCart);
        })
    });


      //create shopping cart
router.post("/customers/:id/shoppingCart", function(req, res){
    var id = req.params.id;
    Customer.findById(id, function(err, customer){
        if (err) {return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
    var shoppingCart = new ShoppingCart(req.body);
    shoppingCart.save(function(err) {
        if (err) { return res.status(500).send(err);}
        console.log(shoppingCart);
    });
    customer.shoppingCart = shoppingCart;
        customer.save();
        return res.status(201).json(customer);
});
});

router.patch("/customers/:id/shoppingCart/:item_id", function(req, res){
    var id = req.params.id;
    Customer.findById(id).populate('shoppingCart').exec(function(err, customer) {
        if (err) {return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
    Item.findById(req.params.item_id, function(err, item){

        if (err) {return res.status(500).send(err);}
        if (item == null) {
            return res.status(404).json({"message": "Item not found"});
        }
        
    customer.shoppingCart.items.push(item);
    customer.shoppingCart.save();
    customer.save();
    return res.status(201).json(customer.shoppingCart);

    });
})});

//remove an item from shopping cart
router.delete('/shoppingCart/:shoppingCart_id/items/:item_id', function(req, res) {

    ShoppingCart.findByIdAndUpdate({ _id: req.params.shoppingCart_id },{ $pull: { items: req.params.item_id  } }, 
        function(err, shoppingCart) {
        if (err) { return res.status(500).send(err);}
        if (shoppingCart == null) {
            return res.status(404).json({"message": "No shopping cart"});
        }
        res.status(204).json(shoppingCart.items);
    });
});
module.exports = router;