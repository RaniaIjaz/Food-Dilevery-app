//here we will create user authentication system which will allow user to login and register on web page
//(it will be linked with userRoute.js ,userModels.js)


import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; //using it we will create authentication
//import bycrypt from "bcrypt";
import validator from "validator";
import bycrypt from 'bcryptjs';


//login User--------------------------------------------------------------------------------------
const logInUser = async (req, res) => {
  console.log(req.body)
  //now we will create api using which registerd user can login
  const {email,password} = req.body
  try {
    //wetger user is available with that email
    const userExists = await userModel.findOne({email})
    if(!userExists) {
      return  res.json({success:false,  message:"User not found"})
    }

    //if user is available than we will match user password with the password stored in database
    const isPasswordMatch = await bycrypt.compare(password,userExists.password) //the new password, the user password in database

    if(!isPasswordMatch){
      return res.json({success:false, message:"Invalid credentials"})
    }

    //if password matches we will generate a token
    const token = createToken(userExists._id)
    res.json({success:true,token})

  } catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
  }
  
};

//Creating Token-------------------------------
//we need userid that will be self generated in database
const createToken = (userId) =>{
    return jwt.sign({userId},process.env.JWT_SECRET)
}
//here we have used userid as data and generated a token than we returned this token using createToken()

//Register user-------------------------------------------------------------------------------------
const registerUser = async (req, res) => {
  console.log(req.body)
  //1st we have to destructure the name,email,password from request body
  const { name, password, email } = req.body; //in these variables name,email,password will be stored

  try {
    //1st we check if any user exists with this email
    const userExists = await userModel.findOne({ email }); //means if an account with that email already exists it will be stored in userExits variable
    if (userExists) {
      return res.json({ success: false, message: "User Already exists" });  ///success will be false bcz the account already existed in database we have not created it
    }

    //validating email format and strong password
    //it checks if user email is valid or not if not  it will generate a response
    if(!validator.isEmail(email)){
        return res.json({success:false, message:"Please enter valid email"})
    }

    //Now  we check the length of password greater than 8 or not
    if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"})
    }

    //To encrypt Password(hashing user password) using genSalt
    const salt = await bycrypt.genSalt(10); //it will generate a random salt //the number that we have put should be btw 5-15 as higher the number is it will crate the strongest password according to that number .here we add 10 if we set 15 it will take time to encrypt password
    console.log(salt)
    //bcrypt.genSalt(10): This generates a random value called a salt that is used to make passwords harder to crack when they are stored in a database. The number 10 means how complex or strong you want the salt to be (higher numbers mean stronger but slower to generate
    const hashsedPassword = await bycrypt.hash(password,salt)// here we created encrypted password using salt
    //so that User password will be hashed and stored in hashed variable

    //now will cretae new user
    const newUser = new userModel({
        name:name,
        email:email,
        password:hashsedPassword
    })

    //saving new user in database
    const user = await newUser.save()  

    //Now we have to take userId and create a tokken and we will send that token using response to user
    const token = createToken(user._id) // created token
    res.json({success:true,token})//send token
    //if we get any error we will impliment the catch block

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
  
};

//to use register user api we will have to go to endpoint /register (/api/user/register)

export { logInUser, registerUser };
