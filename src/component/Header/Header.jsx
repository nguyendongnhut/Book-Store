import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

import Cart from "../Cart/Cart";
import Info from "../Info/Info";

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
    <div className="Header">
      <div className="Header__logo">Logo</div>
      <div className="Header__Right">
        <div className="Header__menu">
          <ul>
            <li>
              <Cart />
            </li>
            {sessionStorage.getItem("token") ? (
              <li>
                <div className="dropdown">
                  <Info />
                </div>
              </li>
            ) : (
              ""
            )}
            {sessionStorage.getItem("token") ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <button onClick={handleLogin}>Login</button>
              </li>
            )}
          </ul>
        </div>
        <div className="nav-header">
          <ul className="nav-header__list">
            <li className="nav-header__child">
              <Link to="/products">Products</Link>
            </li>
            <li className="nav-header__child">
              <Link to="/products/AddProduct">Add Product</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
