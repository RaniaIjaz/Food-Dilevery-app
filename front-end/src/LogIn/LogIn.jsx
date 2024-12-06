import React, { useContext, useEffect, useState } from "react";
import "./LogIn.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../ContextApi/Context";
import axios from "axios"

const LogIn = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  //we have to fetch the url using context api
  const {url,setToken}= useContext(StoreContext)
  //we can use this url for login component

  //here we will create state variable where we will store user name, email, password
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //the onChange handler will take data from input field and store inn state variable
  const onChangeHandler= (event)=>{
    const name =event.target.name
    const value = event.target.value
    //to set value in state variable
    setUserData((prevData) => ({ ...prevData, [name]: value })); //it means in previosdata we will change name field and update it with new updated value
  }

  useEffect(() => {
    console.log(userData)
  }, [userData])
  
  const onLogin  = async (event)=>{
     //we will liink it with form
     event.preventDefault() //the page will not reload when we login or sign up
     //to call api 
     let newUrl =url
     if(currState==="Login"){
      //we will append our login api with newaurl
      newUrl += "api/user/login"
     }
     else{
      newUrl += "api/user/register"
     }

     const response = await axios.post(newUrl,userData)
     
     //it means that the user has sign up or login
     if(response.data.success){
      //we will get one token to save it we use 1 state variable
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)//store token in local storage    
      //"token" is value name , response.data.token is value

      //we will use stShowLogin() to hide the login page
      setShowLogin(false)
     }

     else{
      alert(response.data.message)
     }
  }

  
  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h1>{currState}</h1>
          {/* //An <img> element that acts as a close button. When clicked, it calls setShowLogin(false), which presumably hides the login form or modal */}
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}     
            alt="image" //means jab cross parr click kare to wo gaib ho jai
          ></img>
        </div>

        <div className="login-inputs">
        {/* is ka matlab hai ke agr state login hai to name field na ai . agr state sign in hai to name field ko dal do . email,password field dono states mein hogi*/}
          {currState === "Login" ? (
            <></>
          ) : (
            <input name="name" onChange={onChangeHandler} value={userData.name} type="text" placeholder="Your name" required></input>
          )}

          <input name="email" onChange={onChangeHandler} value={userData.email} type="email" placeholder="enter your email" required />
          <input name="password" onChange={onChangeHandler} value={userData.password} type="password" placeholder="enter your password" required />
        </div>

        {/* Dynamic Button Text: The button text changes based on the current state. It displays "Create Account" when in the sign-up mode and "Login" when in the login mode */}
        <button type="submit">{currState === "Login" ? "Login" : "Create Account"}</button>

        <div className="login-condition">
          <input type="checkbox" required></input>
          <p>By continuing, I agree to terms of use & privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p>
          Create a new account?
          <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
          Already have an account?
          <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogIn;
