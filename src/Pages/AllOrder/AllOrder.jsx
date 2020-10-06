import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Order from "../../component/Order/Order";

AllOrder.propTypes = {};

function AllOrder(props) {
  const [orders, setOrders] = useState([]);

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
        `http://localhost:3001/api/cart/orders/all`,
        requestOptions
      );

      const responseJSON = await response.json();

      const data = responseJSON.data;
      console.log("all orders:", data);

      setOrders(data);
    }

    FetchAllOrders();
  }, []);

  const handleDeleteOrder = () => {
    console.log("asfsdf");
  };

  return (
    <React.Fragment>
      <Order list={orders} handleDeleteOrder={handleDeleteOrder} />
    </React.Fragment>
  );
}

export default AllOrder;
