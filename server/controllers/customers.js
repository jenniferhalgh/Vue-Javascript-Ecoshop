var express = require("express");
const Customer = require("../models/customer");
const PaymentInfo = require("../models/paymentInfo");
const ShoppingCart = require("../models/shoppingCart");
const Item = require("../models/item");
const Order = require("../models/order");
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

    Customer.findById(id, function(err, customer){
            if (err) {return res.status(500).send(err);}
            if (customer == null) {
                return res.status(404).json({"message": "Customer not found"});
            }
        const newInfo = {
            name: {
              firstname: req.body.name.firstname,
              lastname: req.body.name.lastname
            },
            account: {
              username: req.body.account.username,
              password: req.body.account.password
            },
            email: req.body.email,
            phone: req.body.phone,
            personalNumber: req.body.personalNumber,
            adress: req.body.adress,
            shoppingCart: customer.shoppingCart,
            paymentInfo: customer.paymentInfo,
            orders: customer.paymentInfo,
            token: customer.token,
            _id: customer._id
    
        }
    Customer.findOneAndReplace({_id: id}, newInfo, {option: true}, function(err, customer){
        if (err) { return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
    
        res.status(200).json(customer);
    });
});
  })

//Delete a customer
router.delete('/customers/:id', function(req, res) {
    var id = req.params.id;

    ShoppingCart.remove({customer: id}).exec();
    Order.remove({customers: id}).exec();
    PaymentInfo.remove({customer: id}).exec();

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

router.patch("/customers/:customer_id/shoppingCart/:item_id", function(req, res){
    var id = req.params.customer_id;
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
router.delete('/customers/:customer_id/shoppingcart/:item_id', function(req, res) {
    Customer.findById(req.params.customer_id, function(err, customer) {
        if (err) {return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
    ShoppingCart.findByIdAndUpdate({ _id: customer.shoppingCart},{ $pull: { items: req.params.item_id  } }, 
        function(err, shoppingCart) {
        if (err) { return res.status(500).send(err);}
        if (shoppingCart == null) {
            return res.status(404).json({"message": "No shopping cart"});
        }
    shoppingCart.save();
    customer.save();
    return res.status(204).json(customer.shoppingCart);
    });
});
})
module.exports = router;