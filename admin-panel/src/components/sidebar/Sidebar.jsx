import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
    <div className="sidebar-options">
     
     {/* when we click on add icon we go to add page */}
      <NavLink to="/" className="sidebar-option">
        <img src={assets.add_icon} alt="Add Icon" />
        <p>Add Items</p>
      </NavLink>

      {/* when we click on list icon we go to list page */} 
      <NavLink to="/list" className="sidebar-option">
        <img src={assets.order_icon} alt="Order Icon" />
        <p>List Items</p>
      </NavLink>

      {/* when we click on order icon we go to order page */}
      <NavLink to="/order" className="sidebar-option">
        <img src={assets.order_icon} alt="Orders" />
        <p>Orders</p>
      </NavLink>
    </div>     
    </div>
  )
}

//in inspect when i click on add icon it shows active class,if i click on list icon it shows active class,if i click on order icon it shows active class, only the icon which is clicked will show active class 

export default Sidebar


//NavLink is a special version of the Link component from the react-router-dom library that provides additional styling functionality. It allows you to navigate between different routes in your app and apply styles based on whether the link is active (i.e., whether it matches the current URL).
// Common Props:
// to: The path to navigate to.
// exact: Only applies the active style when the URL matches exactly.
// activeClassName: The class to apply when the link is active.
// activeStyle: Inline style to apply when the link is active.
