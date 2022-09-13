var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var store = new Schema (
{
name:{type: String},
items:[{type: Schema.Types.ObjectId, ref: "items"}]

});
//module.exports = mongoose.model('storeModel', store);
const storeModel = mongoose.model("storeModel", store);