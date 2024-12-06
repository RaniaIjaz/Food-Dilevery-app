//here we will create multiple routes  (it will be linked with userModels.js ,userModels.js)

import express from "express"
import { logInUser,registerUser } from "../controllers/userController.js";


const userRouter = express.Router()

//we need data of user (email,password) to create user
//we wil make a post method
userRouter.post("/register",registerUser)

userRouter.post("/login",logInUser)

export default userRouter