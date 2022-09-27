var express = require("express");
var router = express.Router();
const Customer = require("../models/customer");
var PaymentInfo = require("../models/paymentInfo");


//create customer's payment information
router.post("/customers/:id/paymentInfos", function(req, res){

    if(req.body.cardInfo.nameOnCard  == ''||req.body.cardInfo.cardNum  == ''||req.body.cardInfo.cvv == ''){
        return res.status(400).json({title: 'Empty fields', error: 'All inputs required!'})
    } else {
            var id = req.params.id;
            Customer.findById(id, function(err, customer){
                if (err) {return res.status(500).send(err);}
                if (customer == null) {
                    return res.status(404).json({"message": "Customer not found"});
                }
                var paymentInfo = new PaymentInfo(req.body);
                paymentInfo.save(
                    function(err) { 
                    if (err) {return res.status(500)}
                    console.log(paymentInfo);}
                );
                customer.paymentInfo.push(paymentInfo);
                customer.save();
                return res.status(201).json(customer.paymentInfo);
            });
        }});

//get all of a customer's payment information
router.get('/customers/:id/paymentInfos', function(req, res){
    var id = req.params.id;
    Customer.findById(id).populate("paymentInfo").exec(function(err, customer){
    if (err) {return res.status(500).send(err);}
    if (customer == null) {
        return res.status(404).json({"message": "Customer not found"});
    }
    res.status(200).send(customer.paymentInfo);
    })
});

//get a customer's specific payment information
router.get('/customers/:customers_id/paymentInfos/:paymentInfos_id', function(req, res){
    var id = req.params.customers_id;
    Customer.findById(id).populate({path: "paymentInfo", match: {_id: req.params.paymentInfos_id} }).exec(function(err, customer){
    if (err) {return res.status(500).send(err);}
    if (customer == null) {
        return res.status(404).json({"message": "Customer not found"});
    }
    res.status(200).send(customer.paymentInfo);
    })
});
//delete customer's payment information
router.delete('/customers/:customer_id/paymentInfos/:paymentInfos_id', function(req, res) {
    PaymentInfo.findOneAndDelete({_id: req.params.paymentInfos_id},function(err, paymentInfo) {
        if (err) { return res.status(500).send(err);}
        if (paymentInfo == null) {
            return res.status(404).json({"message": "Payment Information not found"});   
        }
    
    Customer.findByIdAndUpdate({ _id: req.params.customer_id },{ $pull: { PaymentInfo: req.params.paymentInfos_id  } }, 
        function(err, customer) {
        if (err) { return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
        res.status(204).json(customer.paymentInfo);
    });
    });

    
});
//delete all payment information of a customer
router.delete("/customers/:customer_id/paymentInfos", function (req, res) {
    PaymentInfo.deleteMany(function (err, paymentInfo) {
        if (err) { return res.status(500).send(err);}
        if (paymentInfo == null) {
            return res.status(404).json({"message": "Payment Information not found"});
        }});
    Customer.findByIdAndUpdate({ _id: req.params.customer_id },{ $set: { "paymentInfo":[] } }, 
        function(err, customer) {
        if (err) { return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
        res.status(204).json(customer);
    });

  });
//update customer's payment information

/*router.put("/customers/:customer_id/paymentInfos/:paymentInfos_id", function(req, res){
    var id = req.params.id;
    Customer.findById(id).populate('paymentInfo').exec(function(err, customer) {
        if (err) {return res.status(500).send(err);}
        if (customer == null) {
            return res.status(404).json({"message": "Customer not found"});
        }
    PaymentInfo.findByIdAndUpdate(req.params.paymentInfos_id, function(err, paymentInfo){

        if (err) {return res.status(500).send(err);}
        if (paymentInfo == null) {
            return res.status(404).json({"message": "Payment Information not found"});
        }
    customer.paymentInfo.push(paymentInfo);
    customer.paymentInfo.save();
    customer.save();
    return res.status(201).json(customer.paymentInfo);
    });
})});*/

module.exports = router;
