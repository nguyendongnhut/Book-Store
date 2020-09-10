import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./Products.css";

Products.propTypes = {
  products: PropTypes.array,
};

Products.defaultProps = {
  products: [],
};

function Products(props) {
  const [productList, setProductList] = useState([]);

  // const fetchProductList = async () => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       // Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + sessionStorage.getItem("token"),
  //     },
  //   };

  //   fetch("http://localhost:3001/api/products", requestOptions)
  //     .then((res) => console.log(await res.json()))
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    async function fetchProductList() {
      try {
        const response = await fetch("http://localhost:3001/api/products", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
        const responseJSON = await response.json();

        console.log({ responseJSON });
        const data = responseJSON;
        console.log(data);
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
          <li key={item.productId} className="Products__item">
            <div className="Products__info">
              <div className="Products__img">
                <img
                  src={`http://localhost:3001/api/image/${item.image}`}
                  alt={item.name}
                />
              </div>
              <div className="Products__title">
                <Link
                  to={`/products/${item.productId}`}
                  className="Products__name-title"
                  title={item.name}
                >
                  {item.name.length > 15
                    ? item.name.substr(0, 15) + "..."
                    : item.name}
                </Link>
              </div>
              <div className="Products__author">
                <p className="Products__name-author">
                  <Link to="#">{item.authorname}</Link>
                </p>
              </div>
              <div className="Products__price">{`${item.price} VNĐ`}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
