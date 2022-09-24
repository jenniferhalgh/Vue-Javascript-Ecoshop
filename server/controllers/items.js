var express = require("express");
const Item = require("../models/item");
const Store = require("../models/store");
var router = express.Router();

//List all items
router.get('/items', function(req, res){
    Item.find(function(err, items){
        if(err){return res.status(500).send(err);}
        res.status(200).json({"items": items});
    });
});

//List a item with a specific id
router.get('/items/:id', function(req, res){
    var id = req.params.id;
    Item.findById(id).populate("stores").exec(function(err, item){
    if (err) {return res.status(500).send(err);}
    if (item == null) {
        return res.status(404).json({"message": "Item not found"});
    }
    res.status(200).send(item);
    })
});

/*// Filter by category
router.get('/items?category=:category',function(req,res){
  var filter = req.query.category;
  if(filter){
      res.json(item.filter(function(e){
          return filter === e.category;
      }));
  }else{
      res.json(item);
  }
});*/
/*router.get("/items?category=:category", function (req, res, next) {
    console.log("finding");
    Item.find({ category: { $all: [req.params.category]}}).exec(
        function (err,item) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("success");
      return res.status(200).json(item);
    });
  });*/

  //Filter by category
router.get('/items/category/:category', function(req, res, next){
  Item.find({category: req.params.category.toString() }, function(err, items) {
      if(err) { res.status(500).send(err)}
      if(items === null) {
          return res.status(404).json({'Message': 'Item not found'});
      }
      res.status(200).json(items);
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




module.exports = router;