var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paymentInfo = new Schema (
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
}
)