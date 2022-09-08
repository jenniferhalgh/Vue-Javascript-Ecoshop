var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var item = new Schema(
    {
    itemID:  { type: String },

    name :  { type: String },

    price :  { type: Number },

    quantity :  { type: Number },

    store : { type: String }
    }
);

//module.exports = mongoose.model("itemModel",item);