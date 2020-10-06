import React from "react";

import { useState } from "react";
import { useEffect } from "react";

import Order from "../../component/Order/Order";
import { useParams } from "react-router-dom";

OrderOfUser.propTypes = {};

function OrderOfUser(props) {
  const [orders, setOrders] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    async function FetchAllOrders() {
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `http://localhost:3001/api/cart/userId/${userId}`,
        requestOptions
      );

      const responseJSON = await response.json();

      const data = responseJSON.data;
      console.log("all orders:", data);

      setOrders(data);
    }

    FetchAllOrders();
  }, [orders.length]);

  const deleteOrderDetail = async (orderId) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const response = await fetch(
      `http://localhost:3001/api/cart/deleteOrderDetail/orderId/${orderId}`,
      requestOptions
    );
  };

  const handleDeleteOrder = async (orderId) => {
    deleteOrderDetail(orderId);

    let deleteOrder = orders.filter((item) => {
      return item.orderId === orderId;
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const response = await fetch(
      `http://localhost:3001/api/cart/deleteOrder/orderId/${orderId}`,
      requestOptions
    );

    setOrders(deleteOrder);
  };

  return (
    <React.Fragment>
      <Order list={orders} handleDeleteOrder={handleDeleteOrder} />
    </React.Fragment>
  );
}

export default OrderOfUser;
