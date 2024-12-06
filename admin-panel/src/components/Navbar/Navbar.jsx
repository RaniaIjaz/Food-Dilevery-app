import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div>
      <div className="navbar">

      <div >
          <img className='logo' src={assets.logo} alt="Logo" />
          <h2>Admin Panel</h2>
        </div>

        <img className='profile' src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  )
}

export default Navbar
