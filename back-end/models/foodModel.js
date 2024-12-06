//we created these models to define the structure of the data that we will be storing in our database

import mongoose from "mongoose";

//now we will crete schema where we will describe the foodmodel properties
const foodSchema = new mongoose.Schema({
    name: {type:String , required:true},   //now if we try to store any product/data without name it will not be stored
    description: {type:String, required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema); //if the food model already exists it will not create a new one

export default foodModel;



// mongoose.model("food", foodSchema):
// This creates a new Mongoose model named "food" based on the foodSchema.
// A Mongoose model represents a collection in the MongoDB database, and the model allows you to interact with that collection (e.g., CRUD operations).
// mongoose.food.models ||:

// This is a short-circuiting OR operator.
// It's checking if mongoose.food.models already exists (likely meant to check if a model for "food" already exists).
// If it exists, it assigns that to the variable foodModel.
// Purpose:

// The overall line ensures that if the "food" model is already created, it doesn't create a new one. Instead, it uses the existing model.
// If the model doesn't exist, it creates the model using the foodSchema.