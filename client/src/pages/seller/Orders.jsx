import React, { useEffect, useState } from "react";
import { assets, dummyOrders } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

const Orders = () => {
  // State Management
  const [orders, setOrders] = useState([]);

  // Fetch All Orders For Seller
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // THIS IS WHERE YOUR statusHandler SHOULD BE
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const { data } = await axios.post("/api/order/update-status", {
        orderId,
        status: newStatus,
      });

      if (data.success) {
        toast.success("Status Updated");
        fetchOrders(); // reload seller orders
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  // Load Orders Once
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order, index) => (
            
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl  rounded-md border border-gray-300 "
          >
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />

              <div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}
              </p>
              <p>
                {order.address.state}, {order.address.zipcode},{" "}
                {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>

            <p className="font-medium text-lg my-auto text-black/70">
              ${order.amount}
            </p>

            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              {/* STATUS DROPDOWN HERE */}
            <select
              className="p-2 border rounded font-bold items-center justify-center mt-2 text-xs max-w-35"
              value={order.status}
              onChange={(event) => statusHandler(event, order._id)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            </div>

         </div> 
        ))}
      </div>
    </div>
  );
};

export default Orders;
