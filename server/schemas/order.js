var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var order = new Schema (
{
order_id: {type: String},
items:[{type: Schema.Types.ObjectId, ref: "items"}],
total_sum: {type: Number}
});

//module.exports = mongoose.model('orderModel', order);
const orderModel = mongoose.model("orderModel", order);