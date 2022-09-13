var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema(
    {
    itemID:  { type: String },

    name :  { type: String },

    price :  { type: Number },

    quantity :  { type: Number },

    store : { type: String },

    category:[{
        type: String,
        allowedValues: ["Second Hand","Small Creator","Default","Vegan"]
    }]
}
);

module.exports = mongoose.model("items",itemSchema);