import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../FoodDisplay/FoodDisplay'
import AppDownload from '../../appDownload/AppDownload'


const Home = () => {
  const [category , setCategory] = useState("All");
  return (
    <div>
      <Header></Header>
      <Menu category={category} setCategory={setCategory}></Menu>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
