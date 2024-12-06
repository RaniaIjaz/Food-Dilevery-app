import React from 'react'
import './Appdownload.css'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id="app-download">
      <p>For Better Experience Download <br/> Foodora App</p>
      <div className='download-platform'>
     <a href="https://www.apple.com/app-store/"><img src={assets.app_store}/></a> 
      <a href='https://play.google.com/store/apps?hl=en_US'><img src={assets.play_store}/></a> 
      </div>
    </div>
  )
}

export default AppDownload
