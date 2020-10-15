import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

import Logo from "../../images/icon/book-logo-vector.jpg";

import Cart from "../Cart/Cart";
import Info from "../Info/Info";
import SearchInfo from "../SearchInfo/SearchInfo";

function Header() {
  const history = useHistory();

  const handleLogout = () => {
    sessionStorage.removeItem("token");

    history.push("/login");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <div className="Header-wrapper">
      <div className="Header__top">
        <div className="container">
          <div className="Header__top-nav">
            <ul className="top-bar__nav nav-right">
              <li className="cart-item">
                <div className="Header__top-button">
                  <Cart />
                </div>
              </li>
              <li className="user-name">
                {sessionStorage.getItem("token") ? (
                  <div className="dropdown">
                    <Info />
                  </div>
                ) : (
                  ""
                )}
              </li>
              <li className="account-item">
                {sessionStorage.getItem("token") ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <button onClick={handleLogin}>Login</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="Header__main">
        <div className="container">
          <div className="Header__main-inner">
            <div className="logo">
              <Link to="#">
                <img src={Logo} alt="" />
              </Link>
            </div>
            <div className="main__menu">
              <ul className="main__menu-nav nav-right">
                <li className="menu-item">
                  <Link to="/products">Products</Link>
                </li>
                <li className="menu-item">
                  <Link to="/products/addProduct">Add Product</Link>
                </li>
                <li>
                  <SearchInfo />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
