//we will integarte this api with front-end in PlaceOrder.jsx


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//Placing user Order from front-end---------------------------------
const placeOrder = async (req,res)=>{

    const frontEnd_url ="https://food-dilevery-app-frontend.onrender.com/"   //when we will deploy it online we will give the url of that frontend
    //const conversionRate = 277; // Define the conversion rate from USD to PKR


    try {
        //creating new order
        const newOrder = new orderModel({
            userId: req.body.userId,  //userId we will get it from middleware when middleware decode token we will get userId
            items:req.body.items,
            totalAmount: req.body.totalAmount,
            address:req.body.address
        })
        await newOrder.save() //will save order in database

        //after user has succesfully placed order we will clear the use cart for that
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})  //wwe will find the user by its userId and tha update the cartdata to and empty object{}

        //------------------------------STRIPE PAYMENT------------------------
        //logic for creating payment link using stripe
        //first we will create line items where we wil insert all product data,currency,unit amount,quantity
        
        //whatever item we are gettting from user we are using that item and creating line item necessary for stripe payment
        const line_items = req.body.items.map((item) => ({
            price_data:{
                currency:"usd",
                product_data:{
                    name: item.name // Product name from the request body
                },
                unit_amount: item.price * 100 // Price converted to cents (assuming `item.price` is in dollars)
                //unit_amount: Math.round(item.price * conversionRate * 100) // Convert price to PKR and to cents
            },
            quantity: item.quantity // Quantity of the product
        }))
        //we will push delivery charges in line_items
        line_items.push({
            price_data:{
                currency:"usd",   //change to pkr for pakistan
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: 5*100// Delivery charges in cents
                //unit_amount: Math.round(5 * conversionRate * 100) // Convert delivery charges to PKR and to cents
            },
            quantity:1
        })

        //now ww will create a session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontEnd_url}verify?success=true&orderId=${newOrder._id}`,   //if payment is succesful we will be directed to syccess url page
            cancel_url: `${frontEnd_url}verify?success=false&orderId=${newOrder._id}`  //if payment is failed
        })

        res.json({
            success:true,
            session_url : session.url
        })

    } 
    catch (error) 
    {
        console.log(error)
        res.json(
            {
            success:false,
            message:"Cannot place Order"
        })
    }
}
    //we should use webhooks for verification 

    //but now are not using it bcz webhooks is time consuming
    const verifyOrder =async (req,res)=>{
        const{orderId,success} = req.body

        try {
            if(success==="true")
            {
                await orderModel.findByIdAndUpdate(orderId,{payment:true})
                res.json({success:true, message:"Payment successful"})
            }
            //f not paid find the order id and deleet it fromm database
            else{
                await orderModel.findByIdAndDelete(orderId)
                res.json({success:false,message:"Payment Cancel"})
            }
            
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"Error"})
        }
    }

    //users ORDERS for front end---------------------------------------------------
    const userOrder = async(req,res)=>{
        
        try {
            //finding all orders of user using their userId
            const orders = await orderModel.find({userId:req.body.userId})
            res.json({success:true,data:orders})  //using it the user wil get all the irder details
            
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"Error"})
        }
    }

//--------------------------LISTING ORDERS FOR ADMIN PANEL-------------------------------------------------
    //a function to find all the orders of all the user

    const listOrders = async(req,res) =>{
        //logic to frtch all orders details
        try {
            const orders = await orderModel.find({})   //we will get all the orders and there detail
            res.json({success:true,data:orders})
        } 
        catch (error)
        {
            console.log(error)
            res.json({success:false,message:"Error"})
        }
    }

    //new api for updating the order status
    const updateOrderStatus =  async (req,res)  =>{

        try 
        {
            await orderModel.findByIdAndUpdate(req.body.orderId,{orderStatus:req.body.orderStatus})
            res.json({success:true , message:"Status Updated"})
        } catch (error) {
            console.log(error)
            res.json({success:false, message :"Error"
            })
        }
    }

export {placeOrder,verifyOrder,userOrder,listOrders,updateOrderStatus}

