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

  const { categoryId } = useParams();

  useEffect(() => {
    async function FetchListCategory() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/categorys/${categoryId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
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
  }, [listCategory.length, categoryId]);

  return (
    <div className="ListProductCategory">
      <ul className="ProductCategory">
        {listCategory.map((item) => (
          <li key={item.productId} className="ProductCategory__item">
            <div className="ProductCategory__info">
              <div className="ProductCategory__img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="ProductCategory__title">
                <Link
                  to={`/products/${item.productId}`}
                  className="ProductCategory__name-title"
                  title={item.name}
                >
                  {item.name.length > 15
                    ? item.name.substr(0, 15) + "..."
                    : item.name}
                </Link>
              </div>
              <div className="ProductCategory__author">
                <p className="ProductCategory__name-author">
                  <Link to="#">{item.TenTacGia}</Link>
                  <p>{item.description}</p>
                </p>
              </div>
              {/* <div className="ProductCategory__price">{`${item.GiaSanPham} VNĐ`}</div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsByCategory;
