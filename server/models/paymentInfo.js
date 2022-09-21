var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paymentInfoSchema = new Schema (
{
    cardInfo:{
        nameOnCard:{
            type:String
        },
        cardNum:{
            type:String, max:16, min:13
        },
        cvv:{
            type:String, max:3
        }
    },
    customer : { type: Schema.Types.ObjectId, ref: "customers" }



}
)

module.exports = mongoose.model('paymentInfos', paymentInfoSchema);