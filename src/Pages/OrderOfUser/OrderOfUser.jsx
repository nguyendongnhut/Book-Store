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
  }, []);

  return (
    <React.Fragment>
      <Order list={orders} />
    </React.Fragment>
  );
}

export default OrderOfUser;
