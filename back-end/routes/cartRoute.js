import express from "express"

import { addToCart,removeFromCart,getCartData } from "../controllers/cartController.js";

import authenticationMiddleware from "../middleware/Auth.js"

const cartRouter = express.Router()

//we will cretae ,ultiple routes
cartRouter.post("/add",authenticationMiddleware,addToCart)
cartRouter.post("/remove",authenticationMiddleware,removeFromCart)   
cartRouter.post("/get",authenticationMiddleware,getCartData)

export default cartRouter