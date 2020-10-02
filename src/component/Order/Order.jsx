import React from "react";
import PropTypes from "prop-types";

import "./Order.css";
import { Link } from "react-router-dom";

Order.propTypes = {};

function Order(props) {
  const { list } = props;

  console.log(list);

  const listOrder = list.map((item) => (
    <tr key={item.orderId}>
      <td>
        <Link to={`/order/detail/${item.orderId}`}>{item.orderId}</Link>
      </td>
      <td>{item.totalPrice}</td>
      <td>{item.username}</td>
    </tr>
  ));

  return (
    <React.Fragment>
      <div className="inner">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Total Money</th>
              <th>Buyer Name</th>
            </tr>
          </thead>
          <tbody>{listOrder}</tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Order;
