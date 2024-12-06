import React, { useContext } from "react";
import "./fooditems.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../ContextApi/Context";

// const Fooditems = ({ id, name, price, description, image }) => {
//   const {cartItem,removeFromCart,addToCart,url} = useContext(StoreContext)

//   //  console.log("cartItem:", cartItem);
//   //  console.log("item ID:", id);

   
//   return (
//     <div className="food-item">
//       <div className="image-container">
//     {/* src={url+ "images/" + image} now the image will be comming from backend/database */}
//         <img className="food-item-image hoverable-image" src={url+ "images/" +image} alt={name} />
//         {!cartItem[id] ? (
//           <img
//             className="add-to-cart"
//             onClick={() => addToCart(id)}
//             src={assets.add_icon_white}
//             alt="add to cart"
//           />
          
//         ) : (
//           <div className="item-count">
//             <img
//               onClick={() => removeFromCart(id)}
//               src={assets.remove_icon_red}
//               alt="remove from cart"
//             ></img>
//             <p>{cartItem[id]}</p>
//             <img
//               onClick={() => addToCart(id)}
//               src={assets.add_icon_green}
//               alt="add to cart"
//             ></img>
//           </div>
//         )}
//       </div>
//       <div className="food-info">
//         <div className="food-item-name-rating">
//           <p>
//             <b>{name}</b>
//           </p>
//           <img src={assets.rating_starts} alt="stars"></img>
//         </div>
//         <p className="food-item-description">{description}</p>
//         <p className="food-item-price">${price}</p>
//       </div>
//     </div>
//   );
// };



const Fooditems = ({ id, name, price, description, image }) => {
  const { cartItem, removeFromCart, addToCart, url } = useContext(StoreContext);

  // Safeguard against undefined cartItem
  const itemCount = cartItem && cartItem[id] ? cartItem[id] : 0;

  return (
    <div className="food-item">
      <div className="image-container">
        <img className="food-item-image hoverable-image" src={`${url}images/${image}`} alt={name} />
        {!itemCount ? (
          <img
            className="add-to-cart"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add to cart"
          />
        ) : (
          <div className="item-count">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove from cart"
            />
            <p>{itemCount}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add to cart"
            />
          </div>
        )}
      </div>
      <div className="food-info">
        <div className="food-item-name-rating">
          <p>
            <b>{name}</b>
          </p>
          <img src={assets.rating_starts} alt="stars" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Fooditems;


// export default Fooditems;


