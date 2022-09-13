var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customer = new Schema (
{
    name:{
        firstname:{
            type:String
        },
        lastname:{
            type:String
        },
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
        type:String, max:12, min:10
    },
    contact: {
        email: { 
            type: String 
        },
        phone: { 
            type: String 
        },
    },
    adress:{
        type:String  
    },
    shoppingCart:[{
        type: Schema.Types.ObjectId, ref: "item"
    }],
    paymentInfo:[{
        type: Schema.Types.ObjectId, ref: "paymentInfo"
    }]
}
);

//export customer file
const customerModel = mongoose.model("customerModel", customer);