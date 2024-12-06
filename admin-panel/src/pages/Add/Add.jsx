//In these Add,List,Order we create react routes
//here we cretae login to add new product to mongodb database
import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios"
import { toast } from "react-toastify";

const Add = ({url}) => {
  //const url = "http://localhost:9000/"  // url of out backend port

  //to store image we will create a state variable
  const [image, setImage] = useState(false);

  //here we will store data about the product
  const [productData,setProductData] = useState({
    name:"",
    description:"",
    price: "",
    category: "Salad"   //whenever we will reload page the default category will be salad
  })

  //OnChangge handler function for productData
  const onChangeHandler =(event)=>{
    const name = event.target.name // Gets the name of the input field that triggered the event
    const value = event.target.value // Gets the value of the input field
    setProductData(prevData=>({...prevData,[name]:value}))  // Updates the state with the new value for the corresponding input field
//     prevData: The previous state of the product data.
// { ...prevData, [name]: value }: This creates a new object that spreads the previous data and updates the field identified by name with the new value.
  }

  //to check wether our data is getting updated we pass a useeffect
  //whenever our data is updated this will be executed
  // useEffect(()=>{
  //   console.log(productData);
  // },[productData])

  //we we will make api call -->  to prevent loading of page whenever weadd new item(press item button)
  const onSubmitHandler = async(event)=>{
    event.preventDefault()
    //now we will add all the data(image,price,etc) in a form data
    const formData = new FormData()
    formData.append("name",productData.name)
    formData.append("description",productData.description)
    formData.append("category",productData.category)
    formData.append("price",Number(productData.price)) //bcz here we have defined price as string but inn backend we have defined it as number o to convert string to number
    formData.append("image",image)
    //next we send this form data on ouur end point
    //to call api we use axios library
    const response =  await axios.post(`${url}api/food/add`,formData)  //we used post metghod bcz we created the add api using post metgod
    //${url}api/food/add   this is the end point where we will upload the product //here we have written formdata to send the data 
    //the formdata will be added in database and image will be stored in backend folder in uploads

    if(response.data.success){
      //it means if the response is succese means data is stored in mongodb reset the the Data fields
      setProductData({
        name:"",
        description:"",
        price: "",
        category: "Salad"   
      })
      setImage(false)
      toast.success(response.data.message) //where we have added the food added msg in backend response  (in foodcontroller.js)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className="add">
      {/* class flex-col will be used  in many components  so we will add css to it in index.css */}
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
          {/* if an image variable exists , returns a temporary URL for that image if it does; otherwise, it returns a default asset path (like assets.upload_area).  */}
          {/*URL.createObjectURL(image): If image exists, this method creates a temporary URL for the image file that can be used to display it */}
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="Upload Image" />
          </label>
          {/* The provided input allows users to select a file, stores the first selected file in the image state using setImage, and is hidden from view but can be triggered by a label or button. */}
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            required
            hidden
            
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          {/* we will change this input feild into controlled input feild means if anything will be chanfged here it will be automatically updated in data state variable */}
          <input onChange={onChangeHandler} value={productData.name} type="text" name="name" placeholder="Enter Product Name" required />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler} value={productData.description}
            name="description"
            rows="6"
            placeholder="Enter Product Description"
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler} value={productData.category}>
              <option value="Salads">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwiches">Sandwiches</option>
              <option value="Pasta">Pasta</option>
              <option value="Cake">Cake</option>
              <option value="Noodles">Noodles</option>
              <option value="Pure Veg">Pure Veg</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={productData.price} type="number" name="price" placeholder="$10" />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
