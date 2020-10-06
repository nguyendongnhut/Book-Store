import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "../CartProduct/CartProduct.css";
import "../OrderDetail/OrderDetail.css";

function OrderDetail(props) {
  const [products, setProducts] = useState([]);

  const { orderId } = useParams();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const FetchOrderProduct = async () => {
      const response = await fetch(
        `http://localhost:3001/api/cart/orderDetail/orderId/${orderId}`,
        requestOptions
      );

      const responseJSON = await response.json();

      const data = responseJSON.data;

      console.log("detail:", data);
      setProducts(data);
    };

    FetchOrderProduct();
  }, []);

  let listProducts = products.map((item) => (
    <li key={item.productId} className="Cart-products__product">
      <div className="Cart-products__items">
        <div className="Cart-products__img">
          <Link to={`/products/${item.productId}`}>
            <img
              src={`http://localhost:3001/api/image/${item.image}`}
              alt={item.name}
            />
          </Link>
        </div>
        <div className="Cart-products__content">
          <div className="Cart-products__content--inner">
            <div className="Cart-products__desc">
              <Link
                to={`/products/${item.productId}`}
                className="Cart-products__name"
              >
                <span className="Cart-products__badge">{item.name}</span>
              </Link>
              <span className="Cart-products__author">{item.authorname}</span>
            </div>
            <div className="Cart-products__details">
              <div className="Cart-products__price">
                <p className="Cart-products__price-name">Giá</p>
                <p className="Cart-products__real-price">{item.price}đ</p>
              </div>
              <div className="Cart-products__qty">
                <div className="iaIXXn qty__count">
                  <p className="qty__name">Số lượng</p>
                  <p className="qty__amount">{item.orderNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <div>
      <div className="main">
        <div className="Container-itwfbd-0 jFkAwY">
          <div className="Cart">
            <div className="Cart-products__inner">
              <ul className="Cart-products__products">{listProducts}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
