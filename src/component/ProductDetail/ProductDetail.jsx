import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import "./ProductDetail.css";

ProductDetail.propTypes = {
  product: PropTypes.array,
};

ProductDetail.defaultProps = {
  product: [],
};

function ProductDetail() {
  const [item, setItem] = useState([]);
  // const {
  //   match: { params },
  // } = this.props;

  const { productId } = useParams();

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };

        const response = await fetch(
          `http://localhost:3001/api/products/${productId}`,
          requestOptions
        );
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const data = responseJSON;
        setItem(data);
      } catch (error) {
        console.log("failed: ", error.message);
      }
    }

    fetchProductDetail();
  }, [productId]);

  return (
    <div className="Product__Detail">
      {item.map((item) => (
        <div key={item.productId} className="product__item">
          <div className="product__img">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="product__info">
            <h1 className="product__title">{item.name}</h1>
            <h3 className="product__author">
              {`Tác giả:  `}
              <Link to="#" className="product__name-author">
                {item.TenTacGia}
              </Link>
            </h3>
            <h3 className="product__manufacturer">
              {`Tên hãng sản xuất:  `}
              <Link to="#" className="product__name-manufacturer">
                {item.TenHangSanXuat}
              </Link>
            </h3>
            <h3 className="product__type">
              {`Tên loại sản phẩm:  `}
              <Link to="#" className="product__name-type">
                {/* {item.TenLoaiSanPham} */}
                {item.description}
              </Link>
            </h3>
            <p className="product__price">
              {`Giá:  `}
              <p className="price">{`${item.GiaSanPham} đ`}</p>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductDetail;
