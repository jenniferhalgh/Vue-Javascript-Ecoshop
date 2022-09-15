var express = require("express");
const Store = require("../models/store");
const Item = require("../models/item");
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
    Store.findById(id, function(err, store){
        if (err) {return res.status(500).send(err);}
    if (store == null) {
        return res.status(404).json({"message": "Store not found"});
    }
    res.status(200).send(store);
    });
});

//Register new store
router.post("/stores", function(req, res){
    var store = new Store(req.body);
    store.save(function(err) {
        if (err) { return res.status(500).send(err);}
        res.status(201).json(store);
        console.log(store);
    });
});

//Delete a store
router.delete('/stores/:id', function(req, res) {
    var id = req.params.id;
    Store.findOneAndDelete({_id: id}, function(err, store) {
        if (err) { return res.status(500).send(err);}
        if (store == null) {
            return res.status(404).json({"message": "Store not found"});
        }
        res.status(204).json(store);
    });
});

//Update partial info of a specific store
router.patch("/stores/:id", (req, res) => {
    Store.findByIdAndUpdate(req.params.id, req.body, function(err, store){
        if (err) {return res.status(500).send(err);}
        if (store == null) {
            return res.status(404).json({"message": "Store not found"});
          }
          res.status(204).send(store);
    });
  });

//Delete an item from a store
router.delete('/stores/:store_id/items/:item_id', function(req, res) {
    Item.findOneAndDelete({_id: req.params.item_id},function(err, item) {
        if (err) { return res.status(500).send(err);}
        if (item == null) {
            return res.status(404).json({"message": "Item not found"});
        }});

    Store.findByIdAndUpdate({ _id: req.params.store_id },{ $pull: { items: req.params.item_id  } }, 
        function(err, store) {
        if (err) { return res.status(500).send(err);}
        if (store == null) {
            return res.status(404).json({"message": "Store not found"});
        }
        res.status(204).json(store.items);
    });
});

//Delete all item from a store
router.delete("/stores/:store_id/items", function (req, res) {
    Item.deleteMany(function (err, item) {
        if (err) { return res.status(500).send(err);}
        if (item == null) {
            return res.status(404).json({"message": "Item not found"});
        }});
    Store.findByIdAndUpdate({ _id: req.params.store_id },{ $set: { "items":[] } }, 
        function(err, store) {
        if (err) { return res.status(500).send(err);}
        if (store == null) {
            return res.status(404).json({"message": "Store not found"});
        }
        res.status(204).json(store);
    });

  });


//List specific item from a specific store
router.get('/stores/:store_id/items/:item_id', function(req, res){
    var id = req.params.store_id;
    Store.findById(id).populate({path: "items", match: {_id: req.params.item_id} }).exec(function(err, store){
    if (err) {return res.status(500).send(err);}
    if (store == null) {
        return res.status(404).json({"message": "Store not found"});
    }
    res.status(200).send(store.items);
    })
});

//Get all items from a specific store
router.get('/stores/:store_id/items', function(req, res){
    var id = req.params.store_id;
    Store.findById(id).populate("items").exec(function(err, store){
    if (err) {return res.status(500).send(err);}
    if (store == null) {
        return res.status(404).json({"message": "Store not found"});
    }
    res.status(200).send(store.items);
    })
});

//Add item to a store
router.post("/stores/:store_id/items", function(req, res){
    var id = req.params.store_id;
    Store.findById(id, function(err, store){
        if (err) {return res.status(500).send(err);}
        if (store == null) {
            return res.status(404).json({"message": "Store not found"});
        }
        var item = new Item(req.body);

        item.save(
            function(err) { 
            if (err) {return res.status(500)}
            console.log(item);}
        );
        
        store.items.push(item);
        store.save();
        return res.status(201).json(store);
    });
});

module.exports = router;