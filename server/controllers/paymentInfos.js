var express = require("express");
var router = express.Router();
var PaymentInfo = require("../models/paymentInfo");


//store customer's payment information
router.post("/paymentInfos", function(req, res){
    var paymentInfo = new PaymentInfo(req.body);
    paymentInfo.save(function(err) {
        if (err) { return res.status(500).send(err);}
        res.status(201).json(paymentInfo);
        console.log(paymentInfo);
    });
});

//get customer's payment information
router.get('/paymentInfos', function(req, res){
    PaymentInfo.find(function(err, paymentInfo){
        if(err){return res.status(500).send(err);}
        res.status(200).json({"paymentInfos": paymentInfo});
    });
});

//delete customer's payment information
router.delete('/customers/:id/paymentInfos/:id', function(req, res, next){
    var id = req.params.id;
    PaymentInfo.findOneAndDelete({_id: id}, function(err, paymentInfo) {
        if (err) { return res.status(500).send(err);}
        if (paymentInfo == null) {
            return res.status(404).json({"message": "No payment information found"});
        }
        res.status(204).json(paymentInfo);
    });
});
router.delete('/customers/:id/paymentInfos', function(req, res){
    PaymentInfo.deleteMany(function(err, paymentInfo){
        if(err){return res.status(500).send(err);}
        res.status(204).json(paymentInfo);
    });
});
//update customer's payment information
router.put('/customers/:id/paymentInfos/:id', function(req, res){
    var id = req.params.id;
    PaymentInfo.findOneAndReplace({_id: id}, req.body, {option: true}, function(err, paymentInfo){
        if (err) { return res.status(500).send(err);}
        if (paymentInfo == null) {
            return res.status(404).json({"message": "No payment information found"});
        }
    
        res.status(200).json(paymentInfo);
    });
});
router.patch('/customers/:id/paymentInfos/:id', function(req, res, next){
    PaymentInfo.findByIdAndUpdate(req.params.id, req.body,function(err, paymentInfo){
        if (err) { return res.status(500).send(err);}
        if (paymentInfo == null) {
            return res.status(404).json({"message": "No payment information found"});
        }
    });
    res.status(200).json(PaymentInfo);
});

module.exports = router;
