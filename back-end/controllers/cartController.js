import userModel from "../models/userModel.js";

const addToCart = async(req,res)=>{


    try {
        let userData = await userModel.findOne({_id:req.body.userId})  //or use .findById(req.body.userId)  //it means that (_Id/userid shouldd be same as req.body.userId whuch we will get by middleware)
        let cartData = await userData.cartData  //user cartdata willbe stored in this cartdata variable
        //userData.cartData wala cartData actually mein hamare model mein hai

        //userData assume kar le hamara userSchema hai jo hum ne userModels mein bnaya tha us ke andar jo cartData ka object tha(yani user ki cart mein kia kia hai) us ko hum ne userData.cartData  ke  zariye cartData mein store karwa dia
       
        //userData: This variable holds the user data retrieved from the database using the userModel.findOne() query. The query looks up the user document by userId
        //userData.cartData: This accesses the cartData property from the userData object. The cartData is assumed to be an object or array that contains the items the user has added to their shopping cart.

        //when user willhave to add data to cart they will send the token with food_id
        if(!cartData[req.body.itemId])
            { 
            cartData[req.body.itemId] = 1  //1st time when there is no item in cart it will execute it to add item to cart
        }
        else{
            cartData[req.body.itemId] += 1   //2nd - when the quantity of that item incrz it executes iit
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    } 
    
    catch (error) {
        console.log(error)
        res.json({success:false,message:"Cannot add to cart"})
    }

    //to add the item in user cart we  give the itemId/foodId in json   {"itemId": "66fd362de6580ddcc20a59ed"} in body in json and in header we will give the token that is generated when user  logsin/registers
}

//remove  items  from cart---------------------------------------------------------------------------

const removeFromCart = async(req,res)=>{
    try {
        //find user data
        let userData = await userModel.findById(req.body.userId)   //userId will be provided by middleware that will decode our token and convert in user id
        let cartData = await userData.cartData

        //we check if there is any data in cart if yes
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1  //if yes then we will decrement the
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})  //it will find the user by req.body.userId  and update the new cartData

        res.json({
            success:true,message:"Item removed from cart"
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Cannot remove item from cart"})
    }
    //using postman is same as add to cart just change add to remove
}
//fetch user cart data------------------------------------------------------------------
const getCartData =async(req,res)=>{
    try {
        let userData = await  userModel.findById(req.body.userId)
        let cartData = await userData.cartData

        res.json({
            success:true,
            message:"User Cart data fetched successfully",
            cartData:cartData
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Cannot fetch user cart data"})
    }
}


export { addToCart , removeFromCart, getCartData};