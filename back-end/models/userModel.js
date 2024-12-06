// //here we will define models for our user  (it will be linked with userRoute.js ,userController.js)

// import mongoose from "mongoose"

// //we will define 1 schema for our user where we will define properties that will be in model 
// const userSchema = new mongoose.Schema({
//     name: {type: String,required:true},
//     email : {type: String, required:true, unique:true},   //means if a user have created an account it cannot crteate an caccount with same email,  emails should be unique
//     password : {type: String, required:true},
//     cartData : {type: Object,default:{}}  //using it we will manage user cart
// },{minimize:false})
// //if we do not addd this minimize:false the cart data will not be created bcz we have not added any data in cartData , so we have added this minimize property so thata out cartData will be created without any data

// const userModel = mongoose.model.user || mongoose.model("user",userSchema)
// //it means if model (user) is already created use it or else create a new one

// export default userModel;

// //userModel is similar to that of foodModel


//here we will define models for our user  (it will be linked with userRoute.js ,userController.js)

import mongoose from "mongoose"

//we will define 1 schema for our user where we will define properties that will be in model 
const userSchema = new mongoose.Schema({
    name: {type: String,required:true},
    email : {type: String, required:true, unique:true},   //means if a user have created an account it cannot crteate an caccount with same email,  emails should be unique
    password : {type: String, required:true},
    cartData : {type: Object,default:{}}  //using it we will manage user cart
},{minimize:false})
//if we do not addd this minimize:false the cart data will not be created bcz we have not added any data in cartData , so we have added this minimize property so thata out cartData will be created without any data

const userModel = mongoose.model.user || mongoose.model("user",userSchema)
//it means if model (user) is already created use it or else create a new one

export default userModel;

//userModel is similar to that of foodModel