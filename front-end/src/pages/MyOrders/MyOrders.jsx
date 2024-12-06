import { StoreContext } from '../../ContextApi/Context'
import './MyOrders.css'
import axios from 'axios'

import { assets } from "../../assets/assets";
import React, { useContext, useState ,useEffect} from 'react'

const MyOrders = () => {
    const [orderData,setOrderData] =  useState([])
    const {url,token} = useContext(StoreContext)

    const fetchOrders = async() =>{
        const response = await axios.post(url+"api/order/userorder",{},{headers:{token}})
        setOrderData(response.data.data)
        //console.log(response.data.data)
    }

    useEffect(()=>{
        //only if users token exist than execute it
        if(token){
            fetchOrders()
        }  
    },[token])  //suppose user login or logout in that case again execute it

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='container'>
           { orderData.map((order,index)=>{
            return(
                <div key={index} className='order'>
                <img src={assets.parcel_icon} alt="" />
                <p> {order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                        //order.items.length-1  using it we can access the last item of user order
                        return item.name + " x " + item.quantity
                    }

                    else{
                        return item.name + " x " + item.quantity + ", "
                    }
                })}
                </p>

                <p>${order.totalAmount}</p>

                <p>Items: {order.items.length}</p>

                <p> <span>&#x25cf;</span> <b>{order.orderStatus}</b> </p>

                <button>Track Order</button>
                </div>
            )
           })}
        </div>
    </div>
  )
}

export default MyOrders