import React, { useContext } from 'react'
import './Navbar.css'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../ContextApi/Context'

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("Home")
    const {getCartTotal,token,setToken} =useContext(StoreContext)

    const navigate = useNavigate()

    const logOut =  ()=>{
      //to logout we will removethe token from local storage
      localStorage.removeItem("token")
      setToken("")
      //when user logout we will send him to home page
      navigate("/")
    }
  return (
    <div className='navbar'> 
     <Link to='/'><img src={assets.logo2} className='navbar-logo'></img></Link> 

        <ul className='navbar-links'>
            <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home" ? "active": ""}> Home </Link>
            <a href='#menu' onClick={()=>setMenu("Menu")} className={menu==="Menu" ? "active": ""}>Menu</a>
            <a href='#app-download' onClick={()=>setMenu("About")} className={menu==="Mobile-App" ? "active": ""}>Mobile-App</a>
            <a href='#footer' onClick={()=>setMenu("Contact")} className={menu==="Contact" ? "active": ""}>Contact</a>
        </ul>        
      <div className='navbar-right'>
            <div className='navbar-search-icon'>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <div className='navbar-basket-icon'>
               <Link to='/Cart'><i className="fa-solid fa-basket-shopping"></i></Link> 
               <span className={getCartTotal()===0 ? " " :"cart-indicator"}></span>
            </div>

            {/* if the token has not generated means that user has not logedin our signed up show the button . else show orders or  */}
            {!token ? <button onClick={()=>setShowLogin(true)}>Login</button>
            : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li onClick={()=>navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logOut}>
                <img src={assets.logout_icon} alt="" />
                <p>LogOut</p>
                </li>
              </ul>
            </div> 
            
            }

        </div>

    </div>
  )
}

export default Navbar
