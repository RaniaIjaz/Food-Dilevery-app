import express from "express";
import { addFoodItem,getAllFoodItemsFromDB,removeFoodItem } from "../controllers/foodController.js";
import multer from "multer"; //using it we will create image storing system

const foodRouter = express.Router(); //using this router we can crete get,post and manuy other methods


//now we will crete logic using which the image will be saved in upload folder
//Image Storage engine
//here we create storage using multer disk storage method
const storage = multer.diskStorage({
    destination:"uploads/",    //provide folder name where i want to store image
    
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`); //when we upload a file timestamp will be added to file original name and fil ewill be added to uploads folder
    }
})
//the middlewear upload has been created now the images will be stored in upload folder
const upload = multer({storage:storage});

//---------------------creating endpoint for adding food items to the database-------------------------------------

//here we will create post request/method for adding food item
foodRouter.post("/add",upload.single("image"),addFoodItem)  //we use this post method to send data on server and on server our data will be processed we will get a response
///add is the endpoint
//we used the upload.single("image") method created using multer package to upload a single file and the file will be stored in the uploads folder

//---------------------creating endpoint for getting all the food items from the database-------------------------------------

foodRouter.get("/getall_List",getAllFoodItemsFromDB) ///by this api end point we send a get request to server and get all the food items from the database
//http://localhost:9000/api/food/getall_List

//---------------------creating endpoint for removing food items from the database-------------------------------------

foodRouter.post("/remove",removeFoodItem)//send  post request (add id  to  body in json format) to remove food item from upload folder and database
//http://localhost:9000/api/food/remove
//{"food_id":"66e5a72dd7470d42f15f861a"}   //give id of food item to be deleted


export default foodRouter;

//This setup allows for adding food items with associated image uploads. The images are stored in the "uploads/" directory with unique filenames, and the addFoodItem controller function (not shown in this file) will handle the rest of the logic for adding the food item to the system.


//now we will add logic for addFoodFunction in fooCoontroller.js