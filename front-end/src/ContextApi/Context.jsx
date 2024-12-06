import { createContext, useState ,useEffect} from "react";
//import { food_list } from "../assets/assets";
import axios from "axios";

//Importing and exporting context from a file as we have to export food_list from another folder so we  use export here
export const StoreContext = createContext(null); //returns a context object

export const StoreContextProvider = ({ children }) => {
  const [cartItem, setcartItem] = useState({});
  //console.log("cartItem:", cartItem);

  //const url = "http://localhost:9000/"
  const url = "https://food-dilevery-app-back-end.onrender.com"

  const [token,setToken] = useState("")

  //now we will fetch these food items from database for this we will comment out the food_list from asset
  const [food_list,setFoodList] =useState([])
  

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      //if user is adding for first time this will be executed
      setcartItem((prev) => ({ ...prev, [itemId]: 1 }));
      ///console.log("ItemId: ", itemId);
    } //if product is already available in cart this will be axecuted
    else {
      setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    //to link it with backend
    //when we will be loged in we will have a token in that case when we add product inn cart that will be added in user Cartdata in databbase
    if(token) {
      await axios.post(url + "api/cart/add",{itemId},{headers:{token}})
    }


    // try {
    //   if (!cartItem[itemId]) {
    //     setcartItem((prev) => ({ ...prev, [itemId]: 1 }));
    //     console.log("ItemId: ", itemId);
    //   } else {
    //     setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    //   }
  
    //   if (token) {
    //     await axios.post(url + "api/cart/add", { itemId }, { headers: { token } });
    //   }
    // } catch (error) {
    //   console.error("Error adding to cart:", error);
    // }
  };

  const removeFromCart = async (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if(token) {
      await axios.post(url + "api/cart/remove",{itemId},{headers:{token}})
    }
  };

  // const getCartTotal =()=>{
  //   let totalAmount = 0;
  //   for (const item in cartItem) {
  //     if(cartItem[item]>0)
  //     {
  //       let itemInfo = food_list.find((product)=>product._id===item)
  //     totalAmount += itemInfo.price * cartItem[item];
  //     }
  //   }
  //   return totalAmount;
  // }


  const getCartTotal = () => {
    if (food_list.length === 0) {
        return 0; // Return 0 if food_list is empty
    }

    let totalAmount = 0;

    for (const item in cartItem) {
        if (cartItem[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);

            if (itemInfo) {
                totalAmount += itemInfo.price * cartItem[item];
            } else {
                console.warn(`Item with ID ${item} not found in food_list`);
            }
        }
    }

    return totalAmount;
};


//fetching food items from database
  const fetchFoodList = async()=>{
    const response = await axios.get(url+"api/food/getall_List") 
    console.log(response.data); 
    setFoodList(response.data.foodItems)

   }

  //when we press on + to add something in our cart and then refresh the page the added things are removed
  //to deal with it we do
  const loadCartData =async(token)=>{
    //call api
     const response = await axios.post(url+ "api/cart/get",{},{headers:{token}})
     //wewill get a response where we will get cart data
     //we will store that data in cartItems thaat we already have as a state
     console.log("Cart data fetched:", response.data.cartData);
     setcartItem(response.data.cartData) 
     //our cart data will be loaded in this setcartItem state

     //now we wil call fuction loadCartdata in useeffect whenever ouur page is reloaded
  }
  
  useEffect(()=>{
    async function loadData() {
      await fetchFoodList()
    
    //after reloading the page we get loged out to manage this
    if(localStorage.getItem){
      setToken(localStorage.getItem("token"))
      await loadCartData(localStorage.getItem("token"))
    }
    }
    loadData()
  },[])

  //the variables in it can be accesed by any commponent
  const contextValue = {
    food_list, //we can access this foodlist anywhere in any component now
    cartItem,
    setcartItem,
    addToCart,
    removeFromCart,
    getCartTotal,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

