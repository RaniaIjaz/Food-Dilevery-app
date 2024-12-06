import React from 'react'
import './Menu.css'
import { menu_list } from '../../assets/assets'
const Menu = ({category,setCategory}) => {
  
  return (
    <div className='menu' id='menu'>
      <h1>Dive into Flavor</h1>
      <p className='menu-content'>
        Savor a diverse array of culinary delights crafted with passion and precision. From appetizing starters to mouth-watering mains and decadent desserts, our menu promises a gastronomic journey that delights the senses. Whether you crave comforting classics or bold, innovative flavors, discover your next favorite dish with us.
      </p>
      <div className='menu-list'>
            {menu_list.map((item, index) => {
                return(
                        <div onClick={()=> setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)} className='menu-item' key={index} >
                            <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt='img'/> 
                            <p>{item.menu_name}</p>
                             </div>
                            )
      }
      )
      }
      </div>
      <hr></hr>
    </div>
  )
}

export default Menu
