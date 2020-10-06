import React from "react";
import PropTypes from "prop-types";

import "./Order.css";
import { Link } from "react-router-dom";

import * as NumberToPrice from "../../constants/NumberToPrice";
import { useState } from "react";
import { List } from "semantic-ui-react";

Order.propTypes = {};

function Order(props) {
  const { list, handleDeleteOrder } = props;

  // function handleDeleteOrder(key) {
  //   console.log(key);
  // }

  // const deleteOrderDetail = async (orderId) => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + sessionStorage.getItem("token"),
  //     },
  //   };

  //   const response = await fetch(
  //     `http://localhost:3001/api/cart/deleteOrderDetail/orderId/${orderId}`,
  //     requestOptions
  //   );
  // };

  // const handleDeleteOrder = async (key) => {
  //   const orderId = key._targetInst.key;

  //   deleteOrderDetail(orderId);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + sessionStorage.getItem("token"),
  //     },
  //   };

  //   const response = await fetch(
  //     `http://localhost:3001/api/cart/deleteOrder/orderId/${orderId}`,
  //     requestOptions
  //   );
  // };

  const listOrders = list.map((item, index) => (
    <tr key={item.orderId}>
      <td>{index}</td>
      <td>
        <Link to={`/order/detail/${item.orderId}`}>{item.orderId}</Link>
      </td>
      <td>{NumberToPrice.Price(`${item.totalPrice}`) + "đ"}</td>
      <td>{item.username}</td>
      <td>
        <button onClick={() => handleDeleteOrder(item.orderId)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <div className="inner">
        <table>
          <thead>
            <tr>
              <th>Numerical Order</th>
              <th>Code Orders</th>
              <th>Total Money</th>
              <th>Buyer Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{listOrders}</tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Order;
