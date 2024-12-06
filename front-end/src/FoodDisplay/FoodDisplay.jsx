import React, { useContext } from 'react'
import  './FoodDisplay.css'
import Fooditems from '../components/FoodItems/Fooditems'
import { StoreContext } from '../ContextApi/Context'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)  //useContext is a React Hook that lets you read and subscribe to context from your component// here we passed the Store Context from createContext
    console.log(food_list)
  return (
    <div className='food-display'>
      <h1>Top Dishes Near You</h1>
      <div className='food-items-list'>
        {food_list.map((item,index) => { 
          {console.log(category,item.category)}
            if(category==="All" || category===item.category){ //if we click on sandwich it will only show sandwiches etc
                return(
                <Fooditems key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price}/>
            )  
            } 
        })}
      </div>
    </div>
  )
}



// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   if (!food_list) {
//       return <div>Loading...</div>; // Display a loading message or spinner
//   }

//   return (
//       <div className='food-display'>
//           <h1>Top Dishes Near You</h1>
//           <div className='food-items-list'>
//               {food_list.map((item, index) => {
//                   if (category === "All" || category === item.category) {
//                       return (
//                           <Fooditems key={index} itemId={item._id} name={item.name} description={item.description} image={item.image} price={item.price} />
//                       );
//                   }
//                   return null; // Return null if the category doesn't match
//               })}
//           </div>
//       </div>
//   );
// };


export default FoodDisplay