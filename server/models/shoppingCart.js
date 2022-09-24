var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var shoppingCartSchema = new Schema (
{
    customer: {type: Schema.Types.ObjectId, ref: "customers"},
    items:[{type: Schema.Types.ObjectId, ref: "items"}],
    totalPrice:{type: Number},
    quantitiyOfItems:{type: Number}
});


module.exports = mongoose.model('shoppingCarts', shoppingCartSchema);