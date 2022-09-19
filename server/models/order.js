var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema (
{
    
items:[{type: Schema.Types.ObjectId, ref: "items"}],
total_sum: {type: Number},
customers: { type: Schema.Types.ObjectId, ref: "customers" }
});

module.exports = mongoose.model('orders', orderSchema);