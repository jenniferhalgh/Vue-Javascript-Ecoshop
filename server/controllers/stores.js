var express = require("express");
const Store = require("../models/store");
var router = express.Router();

//List all stores
router.get('/stores', function(req, res){
    Store.find(function(err, stores){
        if(err){return res.status(500).send(err);}
        res.status(200).json({"stores": stores});
    });
});

//List a store with a specific id
router.get('/stores/:id', function(req, res){
    var id = req.params.id;
    Store.findById(id).populate("items").exec(function(err, store){
    if (err) {return res.status(500).send(err);}
    if (store == null) {
        return res.status(404).json({"message": "Store not found"});
    }
    res.status(200).send(store);
    })
});

//Register new store
router.post("/store", function(req, res){
    var store = new Store(req.body);
    store.save(function(err) {
        if (err) { return res.status(500).send(err);}
        res.status(201).json(store);
        console.log(store);
    });
});




module.exports = router;