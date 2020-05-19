const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

let productCartSchema = new mongoose.Schema(
    {
        product : {
            type : ObjectId,
            ref : "Product"
        },
        name : String,
        count : Number,
        price : Number
    }
);

const productCart = mongoose.model('productCart',productCartSchema);

let orderSchema = new mongoose.Schema(
    {
        products : [productCartSchema],
        
        transaction_id : {},
        
        amount : {
            type : Number,
        },
        
        address : String,

        status : {
            type : String,
            default : "Recieved",
            enum : ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
        },
        
        updated : Date,

        user : {
            type : ObjectId,
            ref : "User",
        },
    },
    {
        timestamps : true
    }
);

const Order = mongoose.model('Order',orderSchema);

module.exports = {Order,productCart};
