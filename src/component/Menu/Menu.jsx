import React from "react";

import { Link } from "react-router-dom";

function Menu(props) {
  return (
    <nav>
      <div className="container">
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
    </nav>
  );
}

export default Menu;
