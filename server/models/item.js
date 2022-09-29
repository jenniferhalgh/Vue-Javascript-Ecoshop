var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema(
    {

    name :  { type: String },

    price :  { type: Number },

    store : { type: Schema.Types.ObjectId, ref: "stores" },

    category:{
        type: String,
        allowedValues: ["Second Hand","Small Creator","Default","Vegan"]
    },

    image: {type: String}
}
);

module.exports = mongoose.model("items",itemSchema);