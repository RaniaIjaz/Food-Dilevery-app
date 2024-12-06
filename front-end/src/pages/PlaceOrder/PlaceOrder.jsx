import React, { useContext, useState,useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../ContextApi/Context'
import axios from "axios"
import { useNavigate} from 'react-router-dom'
const PlaceOrder = () => {
  const {getCartTotal,token,food_list,cartItem,url} = useContext(StoreContext)

  //we will create a state variable where will store information from these fields (name,llastname,etcc)
  const[data,setData] =  useState({
    firstName: "",
    lastName: "",
    email: "",
    street:"",
    city:"",
    state: "",
    zipCode:"",
    country:"",
    phone: "",
  })

  //onchacge handler function to store the input field data in the state variable
  const onChangeHandler =(event) =>{
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value})) 
  }
  
  useEffect(() => {
    console.log(data)
  }, [data])
  
  //creting a function using that we willbe reditrected  to payment gateway
  const placeOrder = async(event)=>{
    event.preventDefault()
    //link this function to button "proceed to payment"

    //now we will do mapping where we w\are adding all itemdata with quantity in orderItems array
    let orderItems = []  //here the cartItem related data will be added
    food_list.map((item)=>{
      //if cartitems have product with this item id
      if(cartItem[item._id]>0){
        let itemInfo = item  //the item is object in whuch we add a property quantity
        itemInfo["quantity"] = cartItem[item._id]   //we add the quantity field using mapping it wast available before
        orderItems.push(itemInfo)
      }
    })
    //console.log(orderItems)

    //here we generate orderData send the orderData to api from where we will get response,if response is success the if block willbe executed from where we will get session url,  and by window we are sending user to session url
    let orderData = {
      address:  data,  //the state variable will be stored here
      items: orderItems,
      totalAmount: getCartTotal() + 5  //delivery charge
    }
    //now we will send this order data from api
    let response = await axios.post(url+"api/order/place",orderData,{headers:{token}})
    if(response.data.success){
    const {session_url} =response.data
    //to send user on session url
    window.location.replace(session_url)
    
    }

    else{
      alert("Order failed")
    }
  }

  //this is related to my orders --> if the user has loged out the myorder page will not be shown to him
  const navigate = useNavigate()
  useEffect(()=>{
    //means if user is not loged in (means the token is not available take him to cart page)
    if(!token){
      navigate("/Cart")
    }

    else if (getCartTotal()===0)
      {
      navigate("/Cart")

    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
      <p className="title">Delivery Information</p>

      <div className="order-input">
        <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
        <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
      </div>

      <input required name="email" onChange={onChangeHandler} value={data.email}  type="email"  placeholder='Email Address'/>
      <input required name="street" onChange={onChangeHandler} value={data.street}  type="text" placeholder='Street' />

      <div className="order-input">
        <input required name="city" onChange={onChangeHandler} value={data.city}  type="text" placeholder='City' />
        <input required name="state" onChange={onChangeHandler} value={data.state}  type="text" placeholder='State' />
      </div>

      <div className="order-input">
        <input required name="zipCode" onChange={onChangeHandler} value={data.zipCode}  type="text" placeholder='Zipcode' />
        <input required name="country" onChange={onChangeHandler} value={data.country}  type="text" placeholder='Country' />
      </div>

      <input required name="phone" onChange={onChangeHandler} value={data.phone}  type="text" placeholder='Phone number' />

      </div>

      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getCartTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getCartTotal()===0 ? 0 :5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getCartTotal()===0? 0 :   getCartTotal()+5}</b>
            </div>
        
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
