import express from "express"
import authenticationMiddleware from "../middleware/Auth.js"

import {listOrders, placeOrder,updateOrderStatus,userOrder,verifyOrder} from "../controllers/orderController.js";

const orderRouter = express.Router()

orderRouter.post("/place",authenticationMiddleware,placeOrder)

//route for verifyOrder
orderRouter.post("/verify",verifyOrder)

//
orderRouter.post("/userorder" ,authenticationMiddleware,userOrder)

//
orderRouter.get("/list",listOrders)

orderRouter.post("/status" , updateOrderStatus)

export default orderRouter