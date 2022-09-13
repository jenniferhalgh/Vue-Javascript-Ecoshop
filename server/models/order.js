var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema (
{
order_id: {type: String},
items:[{type: Schema.Types.ObjectId, ref: "items"}],
total_sum: {type: Number}
});

module.exports = mongoose.model('orders', orderSchema);