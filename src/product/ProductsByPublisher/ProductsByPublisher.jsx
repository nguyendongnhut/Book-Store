import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

import "./ProductsByPublisher.css";

ProductsByPublisher.propTypes = {
  products: PropTypes.array,
};

ProductsByPublisher.defaultProps = {
  products: [],
};

function ProductsByPublisher(props) {
  const [listPublisher, setListPublisher] = useState([]);

  const { publisherId } = useParams();

  useEffect(() => {
    async function FetchListPublisher() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/publishers/${publisherId}`,
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
        setListPublisher(data);
      } catch (error) {
        console.log("failed: ", error.message);
      }
    }

    FetchListPublisher();
  }, [listPublisher.length, publisherId]);

  return (
    <div className="ListProductPublisher">
      <ul className="ProductPublisher">
        {listPublisher.map((item) => (
          <li className="ProductPublisher__item" key={item.productId}>
            <div className="ProductPublisher__info">
              <div className="ProductPublisher__img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="ProductPublisher__title">
                <Link
                  to={`/products/${item.productId}`}
                  className="ProductPublisher__name-title"
                  title={item.name}
                >
                  {item.name.length > 15
                    ? item.name.substr(0, 15) + "..."
                    : item.name}
                </Link>
              </div>
              <div className="ProductPublisher__author">
                <p className="ProductPublisher__name-author">
                  {/* <Link to="#">{item.TenTacGia}</Link> */}
                  <p>{item.description}</p>
                </p>
              </div>
              <div className="ProductPublisher__price">{`${item.GiaSanPham} VNĐ`}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsByPublisher;
