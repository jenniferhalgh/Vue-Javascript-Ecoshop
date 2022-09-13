var express = require("express");
var router = express.Router();
var customer = require("server/schemas/customer.js");
var paymentInfos = require ("server/schemas/paymentInfo.js");
const app = express.Router();


//store customer's payment information
app.post('/api/paymentInfos', function(req, res, next){
    var paymentInfo = new paymentInfo(req.body);
    try{
        var savedPaymentInfo = await paymentInfo.save();
        res.status(200).json(savedReview);
    }catch(err){
        return res.status(500).send(err);
    }
});

//get customer's payment information
app.get('/api/customers/:id/paymentInfos', function(req, rest, next){
    try {
        await paymentInfos.find(function(err, paymentInfo){
            if(err){
                return res.status(500).send(err);
            }
            res.status(200).json({paymentInfo: paymentInfo});//idk 
        });
    }catch(err){
        return res.status(500).send(err);
    }
});

//delete customer's payment information
app.delete('/api/customers/:id/paymentInfos', function(req, res, next){
    await paymentInfo.delete(function (err, paymentInfo){
        if (err){
            return res.status(500).send(err);
          }
          res.status(200).json(paymentInfo);
    });
});

//update customer's payment information
app.put('/api/customers/:id/paymentInfos/:id', function(req, res, next){
    await paymentInfos.findById(req.params.id);
    const updatePaymentInfo = await paymentInfos.findByIdAndUpdate(
        req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({updatePaymentInfo});
    if (err){
            return res.status(500).send(err);
    }
});
app.patch('/api/customers/:id/paymentInfos', function(req, res, next){
    paymentInfos.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    useFindAndModify: false,
    })
    .then((paymentInfos) => {
        if (!paymentInfos) {
          return res.status(404).send();
        }
        res.status(201).send(paymentInfos);
      })
    .catch((error) => {
        res.status(500).send(error);
    });
});
