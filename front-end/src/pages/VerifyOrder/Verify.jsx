import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import axios from 'axios'

import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../ContextApi/Context'

const Verify = () => {
    //to find url parameter
    const [searchParams,setSearchParams] = useSearchParams()
    //these variables will get us the parameter that are passed in url
    const success =searchParams.get("success")
    const orderId =searchParams.get("orderId")

   //console.log(success,orderId)
   
   const {url} = useContext(StoreContext)
   const navigate = useNavigate()  //to navigate to myorders route

   const verifyPayment = async()=>{
    //here we will call api
    const response = await axios.post(url + "api/order/verify",{success,orderId})
    if(response.data.success){
      navigate("/myorders")
    }
    else{
      navigate("/")
    }
   }

 
   useEffect(() => {
    verifyPayment();  // invoke verifyPayment in useEffect
}, []);  // empty dependency array ensures it runs only once on component mount

   
   
   
  return (
    <div className='verify'>
    <div className='spinner'>
        
    </div>
    </div>
  )
}

export default Verify