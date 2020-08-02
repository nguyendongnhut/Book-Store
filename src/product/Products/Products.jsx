import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

import "./Products.css";

Products.propTypes = {
  products: PropTypes.array,
};

Products.defaultProps = {
  products: [],
};

function Products(props) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function fetchProductList() {
      try {
        const response = await fetch("http://localhost:3001/api/product/new");
        const responseJSON = await response.json();

        console.log({ responseJSON });
        const data = responseJSON;
        setProductList(data);
      } catch (error) {
        console.log("failed: ", error.message);
      }
    }

    fetchProductList();
  }, []);

  return (
    <div className="ListProducts">
      <ul className="Products">
        {productList.map((item) => (
          <li key={item.MaSanPham} className="Products__item">
            <div className="Products__info">
              <div className="Products__img">
                <img
                  src={`http://localhost:3001/images/Product/${item.HinhURL}`}
                  alt={item.TenSanPham}
                />
              </div>
              <div className="Products__title">
                <Link
                  to={`/products/${item.MaSanPham}`}
                  className="Products__name-title"
                  title={item.TenSanPham}
                >
                  {item.TenSanPham.length > 15
                    ? item.TenSanPham.substr(0, 15) + "..."
                    : item.TenSanPham}
                </Link>
              </div>
              <div className="Products__author">
                <p className="Products__name-author">{item.TenTacGia}</p>
              </div>
              <div className="Products__price">{`${item.GiaSanPham} VNĐ`}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
