import React from "react";
import "./footer.css";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="content-left">
            <img className='logo' src={assets.logo2}></img>
            <p>Our mission is to provide you with delicious food and exceptional service.</p>
            <div className="footer-icons">
                <img src={assets.facebook_icon} alt></img>
                <img src={assets.linkedin_icon} alt></img>
                <img src={assets.twitter_icon} alt></img>
            </div>
        </div>

        <div className="content-center">
            <h2>Company</h2>
            <ul>
                <li><a href="#">Home</a></li>
                <li>About us</li>
                <li>Delievry</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div className="content-right">
            <h2>Get in touch</h2>
            <ul >
                <li>123 456 7890</li>
                <li>contact@foodora.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">&copy; {new Date().getFullYear()} foodora.com All rights reserved.</p>
    </footer>
  );
};

export default Footer;
