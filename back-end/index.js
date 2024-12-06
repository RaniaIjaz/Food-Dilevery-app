import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import stripe from "stripe";
import validator from "validator";
import connectDB from "./mongodb/connectDB.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port =process.env.PORT || 9000; // process.env.PORT --> to deploy project

//middleware
app.use(express.json()); //using this middleware whenever we get a request from front end it will be parsed using this json
app.use(cors()); //can accesss backend from any frontend

//database connection
connectDB();

//api endpoints--------------------------------------------------------------------------------------------
//api endpoints for food
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"));//to show uploaded image on frontend. if along withlocalhost:9000 we type/images and the name of uploaded image it will be shown on screen
//when the request is made to /images with a  the upload folder will be checked and the image will be shown on screen

//api Endpoints for user
app.use("/api/user",userRouter)

//api endpointt for cart 
app.use("/api/cart",cartRouter)

//api endpoint for order
app.use("/api/order",orderRouter)

//http method using which we can request data from server
app.get("/",(req,res)=>{
    res.send("Hello from backend");
})

//running express server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

//mongodb+srv://RaniaIjaz:wXvD4hu43MSm2zDH@cluster0.j2ra7.mongodb.net/?





















// jsonwebtoken
// Description: A library to work with JSON Web Tokens (JWT).
// Usage: Used for handling authentication and authorization in your apps by issuing and verifying JWTs for secure communication between server and client.
// 4. bcrypt
// Description: A password-hashing library.
// Usage: Encrypts and verifies passwords, typically used for user authentication by securely hashing passwords before storing them in a database.
// 5. cors
// Description: A middleware to enable Cross-Origin Resource Sharing (CORS).
// Usage: Allows your server to handle requests from other domains (cross-domain requests), which is crucial for building APIs that clients on different domains access.
// 6. dotenv
// Description: A module that loads environment variables from a .env file into process.env.
// Usage: Helps in managing configuration variables, such as API keys and database URLs, without hardcoding them in your codebase.
// 7. body-parser
// Description: A middleware to parse incoming request bodies in a middleware before your handlers.
// Usage: Often used to handle form submissions, JSON payloads, and URL-encoded data in your Express app.
// 8. multer
// Description: A middleware for handling multipart/form-data, primarily for file uploads.
// Usage: Enables you to handle file uploads (e.g., images, documents) in your Express apps.
// 9. stripe
// Description: A Node.js library for interacting with the Stripe API.
// Usage: Used to handle payments, subscriptions, and other Stripe-related functionalities like processing credit cards or generating payment links.
// 10. validator
// Description: A library for string validation and sanitization.
// Usage: Commonly used for validating user inputs such as email addresses, URLs, and strings to ensure correctness and security.