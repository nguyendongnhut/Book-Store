import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as NumberToPrice from "../../constants/NumberToPrice";

ProductSearch.propTypes = {};

function ProductSearch(props) {
  const { list, addToCart } = props;

  let ListProduct = [];

  if (list.length < 1) {
    return <React.Fragment>this product is not found</React.Fragment>;
  } else {
    ListProduct = list.map((item) => (
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
          <div className="Products__price">
            <p>{NumberToPrice.Price(`${item.price}`) + "đ"}</p>
          </div>
          <div className="Products__Add">
            <button
              onClick={() => addToCart(item.productId)}
              key={item.productId}
              className="Products__Add-button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </li>
    ));
  }

  return <React.Fragment>{ListProduct}</React.Fragment>;
}

export default ProductSearch;
