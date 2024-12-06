//here we will creat a orderModel using that we can save user order in database
import mongoose from "mongoose"

const orderSchema  = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    totalAmount:{type:Number,required:true},//total amount/cost of items in cart
    address:{type:Object,required:true},
    orderStatus:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}, //when a new order is placed the payment status will be false
})

const orderModel = mongoose.model.order || mongoose.model("order",orderSchema)

export default orderModel