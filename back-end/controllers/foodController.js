//here we will create api using which we can add new fooditem in our database

import foodModel from "../models/foodModel.js";
import fs from "fs";   //pre-built in nodejs

//--------------------------To add food item-------------------------------------   
const addFoodItem =async(req,res)=>{
//here we will create logic using which we can store product data in database
    //create variable to store name of image
    let image_filename = `${req.file.filename}` //using this we can store the uploaded filename(which was done in foodRouter.js using multer) in this variable

    //create new foodItem using food model
    const foodItem = new foodModel({
        //in foodschema we have some properties here we will provide value for these properties
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename     //here we add the image url to do so we provide image_filename
    })
    try{
        await foodItem.save();  //food item will be saved in database
        res.json({
            success:true,message:"Food item added successfully"
        })
    }catch(error){
        console.log(error);
        res.json({
            success:false,message:"Error in adding food item"
        })
    }
}
//so whenever we hit the addfooditem("/add") api in the body we send the details(name,category,description,price,image) and we will access it in backend using this addFoodItem function. the name of file image will be timestamp + originalName

//we use thunderbolt too run the post method there in the bodu we provide the feild names(name,description etc) and there value  and in the address we provide the url(localhost:5000/food/add) and we get the response . in resonse the image is uploaded in the uploads folder and the data is saved in the database

//--------------------------To get list ofall food items-------------------------------------
//All Food Items List(we are creating the list food api endpoint using which we can display all food items listed in database)
const getAllFoodItemsFromDB = async(req,res)=>{
//creating logic to get all food items and send them as response through "/getall_List" api
try{
    const foodItems = await foodModel.find({}); //this will get all the food items from the database
    res.json({
        success:true,
        message:"Food items fetched successfully",
        foodItems:foodItems
    })
}catch(error){
    console.log(error);
    res.json({
        success:false,
        message:"Error in fetching food items"
    })
}
}

//--------------------------To remove  food items-------------------------------------
const removeFoodItem = async(req,res)=>{
    try{
        //1-to find food item 
        const foodItem = await foodModel.findById(req.body.food_id);  //to delete that food item that we want to delete will be stored in this foodItem variable
        
        //to delete image of product from upload folder
        fs.unlink(`uploads/${foodItem.image}`,()=>{})

        //2-to delete food item from database
        await foodModel.findByIdAndDelete(req.body.food_id);
        res.json({
            success:true,
            message: "Food item deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message: "Error in deleting food item"
        })
    }
}

export {addFoodItem,getAllFoodItemsFromDB,removeFoodItem};  //exporting this function so that it can be used in other files
//using this function we will create one route(foodRoute)