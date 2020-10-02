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

  return (
    <div className="Header">
      <div className="Header__logo"></div>
      <div className="Header__menu">
        <ul>
          <li>
            <Cart />
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <div className="dropdown">
              <Info />
            </div>
          </li>
          {sessionStorage.getItem("token") ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <button>Login</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
