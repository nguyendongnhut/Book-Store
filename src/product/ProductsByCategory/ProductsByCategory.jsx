import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./ProductsByCategory.css";

ProductsByCategory.propTypes = {
  listCategory: PropTypes.array,
};

ProductsByCategory.defaultProps = {
  listCategory: [],
};

function ProductsByCategory() {
  const [listCategory, setListCategory] = useState([]);

  const { CategoryId } = useParams();

  useEffect(() => {
    async function FetchListCategory() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/product/category/${CategoryId}`
        );

        const responseJSON = await response.json();

        const data = responseJSON;
        console.log(data);
        setListCategory(data);
      } catch (error) {
        console.log("failed: ", error.message);
      }
    }

    FetchListCategory();
  }, [listCategory.length, CategoryId]);

  return (
    <div className="ListProductCategory">
      <ul className="ProductCategory">
        {listCategory.map((item) => (
          <li key={item.MaSanPham} className="ProductCategory__item">
            <div className="ProductCategory__info">
              <div className="ProductCategory__img">
                <img
                  src={`http://localhost:3001/images/Product/${item.HinhURL}`}
                  alt={item.TenSanPham}
                />
              </div>
              <div className="ProductCategory__title">
                <Link
                  to={`/products/${item.MaSanPham}`}
                  className="ProductCategory__name-title"
                  title={item.TenSanPham}
                >
                  {item.TenSanPham.length > 15
                    ? item.TenSanPham.substr(0, 15) + "..."
                    : item.TenSanPham}
                </Link>
              </div>
              <div className="ProductCategory__author">
                <p className="ProductCategory__name-author">
                  <Link to="#">{item.TenTacGia}</Link>
                </p>
              </div>
              <div className="ProductCategory__price">{`${item.GiaSanPham} VNĐ`}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsByCategory;
