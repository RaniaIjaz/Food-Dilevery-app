//it is somehow similar to  MyOrders page in front-end
import "./Order.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
const Order = ({ url }) => {
  const [allOrders, setAllOrders] = useState([]);

  //in this function we call api
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "api/order/list"); //(url + "api/order/list")  can be written as this too
    
    if (response.data.success) {
      setAllOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
      console.log(error)
    }
  };

  const statusHandler = async (event, orderId) => {
    // console.log(event,orderId)
    const response = await axios.post(`${url}api/order/status`, {orderId,orderStatus: event.target.value}); //we get the orderStatus from event.target.value

    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order page</h3>
      <div className="order-list">
        {allOrders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>

              <p className="user-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className="user-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ",  " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>

              <p className="user-phone"> {order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>

            <p>${order.totalAmount}</p>
            {/* to get orderId we type order._id */}
            <select onChange={(event) => statusHandler(event, order._id)}
              value={order.orderStatus}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;


