var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema (
{
name:{type: String},
items:[{type: Schema.Types.ObjectId, ref: "items"}]

});
module.exports = mongoose.model('stores', storeSchema);