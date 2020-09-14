import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import Cart from "../Cart/Cart";

function Header() {
  return (
    <div className="Header">
      <div className="Header__logo"></div>
      <div className="Header__menu">
        <ul>
          <li>
            <Cart />
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
