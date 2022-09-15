var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = new Schema (
{
    name:{
        firstname:{
            type:String
        },
        lastname:{
            type:String
        }
    },
    account:{
        username:{
            type:String
        },
        password:{
            type:String
        } 
    },
    personalNumber:{
        type:String, max:12, min:10, unique:true
    },
    contact: {
        email: { 
            type: String,
            unique: true
        },
        phone: { 
            type: String 
        }
    },
    adress:{
        type:String  
    },
    shoppingCart:{
        type: Schema.Types.ObjectId, ref: "shoppingCarts"
    },
    paymentInfo:[{
        type: Schema.Types.ObjectId, ref: "paymentInfos"
    }],
    orders:[{
        type: Schema.Types.ObjectId, ref: "orders"
    }]
}
)
module.exports = mongoose.model("customers",customerSchema);