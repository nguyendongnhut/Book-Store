import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Cart from "../component/Cart/Cart";
import { CartContext } from "../Contexts/CartContext";

import Header from "../component/Header/Header";

import "./CartProduct.css";

CartProduct.propTypes = {};

function CartProduct(props) {
  const [cart, setCart] = useContext(CartContext);

  let newCart = cart.reduce(
    (function (hash) {
      return function (array, obj) {
        if (!hash[obj.id])
          array.push(
            (hash[obj.id] = {
              id: obj.id,
              name: obj.name,
              authorname: obj.authorname,
              image: obj.image,
              price: obj.price,
              count: 1,
            })
          );
        else hash[obj.id].count++;
        return array;
      };
    })({}),
    []
  );

  console.log(newCart);

  let listCarts = newCart.map((item) => (
    <li key={item.id} className="Cart-products__product">
      <div class="Cart-products__items">
        <div className="Cart-products__img">
          <Link to="#">
            <img
              src={`http://localhost:3001/api/image/${item.image}`}
              alt={item.name}
            />
          </Link>
        </div>
        <div className="Cart-products__content">
          <div className="Cart-products__content--inner">
            <div className="Cart-products__desc">
              <Link to="#" className="Cart-products__name">
                <span className="Cart-products__badge">{item.name}</span>
              </Link>
              <span className="Cart-products__author">{item.authorname}</span>
              <p className="Cart-products__actions">
                <span className="Cart-products__del">delete</span>
              </p>
            </div>
            <div className="Cart-products__details">
              <div className="Cart-products__price">
                <p className="Cart-products__real-price">{item.price}</p>
              </div>
              <div className="Cart-products__qty">
                <div className="CartQty__StyledCartQty-o1bx97-0 iaIXXn">
                  <span className="qty-decrease qty-disable">-</span>
                  <p className="qty-input">{item.count}</p>
                  <span className="qty-increase">+</span>
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
      <Header />
      <div className="container">
        <div className="Cart-products__inner">
          <ul className="Cart-products__products">{listCarts}</ul>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
