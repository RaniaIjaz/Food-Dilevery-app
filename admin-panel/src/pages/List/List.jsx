//it is somehow similar to  orders page in admin panel

//to  display the data in mongodb in a list format
import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  //we will create a fetch list function
  const fetchList = async () => {
    //here we will add api call
    const response = await axios.get(`${url}api/food/getall_List`);
    //this is the end point from where we will get our list of items in database
    console.log(response.data);

    if (response.data.success) {
      //our response data will be stored in response variable
      setList(response.data.foodItems);  //bcz in backend we are returning foodItems
    } else {
      toast.error("Error");
    }
  };

  //Remove FoodItem(X)----------------------------------------
  const removeFoodItem = async (foodId) => {
    // console.log(foodId) //when click on  X it will give the id of that iutem
    //now we will do api call
    const response = await axios.post(`${url}api/food/remove`, {food_id: foodId }); //bcz we created renove food item api endpoint using post method
    //{_id:foodiId}   here we passed an obj where the _id of the item to be deleted will be equal to the foodId
    // the item that we delete from admin pannel will be removed from database also
    await fetchList();
    // After successfully removing the food item from the database, you call fetchList() to refresh the list of items by fetching the updated data from the API again.
    //This will ensure the UI is updated to reflect the deletion, showing the remaining food items.

    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  };

  //to run fetchlist() function whenever the web page is loaded we use a use Effect
  useEffect(() => {
    fetchList(); //when we check the console tab it will show us our data fetched from database
  }, []);
  //by using useeffect we have disokayed data in console tab but display it in our List page
  return (
    <div className="list add flex-col">
      <p>All Food Items</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Remove</b>
        </div>

        {list.map((item, index) => {
          //here we will display the data
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}images/` + item.image} alt="" />
              {/*item.image will be yhe image name */}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFoodItem(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
