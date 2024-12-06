import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../ContextApi/Context";
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getCartTotal,url } = useContext(StoreContext);
  
  const navigate = useNavigate(); //useNavigate hook returns a function that lets you navigate programmatically
  

  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <>
                <div  className="cart-item-title cart-items-item">
                  <img src={url + "images/" +item.image} alt=""></img>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${cartItem[item._id] * item.price}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                <hr></hr>
              </>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
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
          </div>
          <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter here</p>
            <div className="cart-promo-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
