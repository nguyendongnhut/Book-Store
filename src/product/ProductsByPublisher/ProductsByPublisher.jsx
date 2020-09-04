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
          `http://localhost:3001/api/product/publisher/${publisherId}`
        );

        const responseJSON = await response.json();

        const data = responseJSON;
        setListPublisher(data);
      } catch (error) {
        console.log("failed: ", error.message);
      }
    }

    FetchListPublisher();
  }, [publisherId]);

  return (
    <div className="ListProductPublisher">
      <ul className="ProductPublisher">
        {listPublisher.map((item) => (
          <li className="ProductPublisher__item" key={item.MaSanPham}>
            <div className="ProductPublisher__info">
              <div className="ProductPublisher__img">
                <img
                  src={`http://localhost:3001/images/Product/${item.HinhURL}`}
                  alt={item.TenSanPham}
                />
              </div>
              <div className="ProductPublisher__title">
                <Link
                  to={`/products/${item.MaSanPham}`}
                  className="ProductPublisher__name-title"
                  title={item.TenSanPham}
                >
                  {item.TenSanPham.length > 15
                    ? item.TenSanPham.substr(0, 15) + "..."
                    : item.TenSanPham}
                </Link>
              </div>
              <div className="ProductPublisher__author">
                <p className="ProductPublisher__name-author">
                  <Link to="#">{item.TenTacGia}</Link>
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
