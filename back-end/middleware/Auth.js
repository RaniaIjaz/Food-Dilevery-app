
import jwt from "jsonwebtoken"

//this middleware will take token and convert it in userId and using that userId we can add,remove or get data from cart

const authenticationMiddleware = async(req,res,next)=>{
    //1-we will take the token from user using the headers than we desturcture the token from req.header
    const {token} = req.headers

    if(!token){
        //if we do not get any token from the user we will display it
        return res.json({success:false, message:"Not authorized Login again "})
        
    }

    try {
        //if we have token decode it  (get tokenn from user)
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)

        //while creating the token we had passed user._id/userExists._id and whend generating token we had an an object{userId} when we decode it we will get it
        req.body.userId = token_decoded.userId
        next()  //next is the callback function

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

export default authenticationMiddleware;