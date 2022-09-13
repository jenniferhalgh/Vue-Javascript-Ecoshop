var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paymentInfoSchema = new Schema (
{
    cardInfo:{
        nameOnCard:{
            type:String
        },
        cardNum:{
            type:String, max:16
        },
        cvv:{
            type:String, max:3
        }
    }

    //add customer here?
}
)

module.exports = mongoose.model('paymentInfos', paymentInfoSchema);