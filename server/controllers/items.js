var express = require("express");
const Store = require("../models/item");
var router = express.Router();

//List all items
router.get('/items', function(req, res){
    Store.find(function(err, items){
        if(err){return res.status(500).send(err);}
        res.status(200).json({"items": items});
    });
});

//List a item with a specific id
router.get('/items/:id', function(req, res){
    var id = req.params.id;
    Store.findById(id).populate("items").exec(function(err, item){
    if (err) {return res.status(500).send(err);}
    if (item == null) {
        return res.status(404).json({"message": "Store not found"});
    }
    res.status(200).send(item);
    })
});

//Register new item
router.post("/item", function(req, res){
    var item = new Item(req.body);
    item.save(function(err) {
        if (err) { return res.status(500).send(err);}
        res.status(201).json(item);
        console.log(item);
    });
});

//Update partial info of an item
router.patch("/items/:id", (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, function(err, item){
        if (err) {return res.status(500).send(err);}
        if (item == null) {
            return res.status(404).json({"message": "Item not found"});
          }
          res.status(204).send(item);
    });
  });

//Replaces an item
router.put('/items/:id', function(req, res) {
var id = req.params.id;
    Item.findOneAndReplace({_id: id}, req.body, {option: true}, function(err, item){
        if (err) { return res.status(500).send(err);}
        if (item == null) {
            return res.status(404).json({"message": "Item not found"});
        }

        res.status(200).json(item);
});
});

//Deletes an item
router.delete('/items/:id', function(req, res) {
    var id = req.params.id;
    Item.findOneAndDelete({_id: id}, function(err, item) {
        if (err) { return res.status(500).send(err);}
        if (item == null) {
            return res.status(404).json({"message": "Item not found"});
        }
        res.status(204).json(item);
    });
});



module.exports = router;