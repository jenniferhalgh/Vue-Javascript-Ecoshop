var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema(
    {

    name :  { type: String },

    price :  { type: Number },

    quantity :  { type: Number },

    store : { type: Schema.Types.ObjectId, ref: "stores" },

    category:[{
        type: String,
        allowedValues: ["Second Hand","Small Creator","Default","Vegan"]
    }]
}
);

module.exports = mongoose.model("items",itemSchema);