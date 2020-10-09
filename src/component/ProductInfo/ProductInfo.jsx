import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { useParams, location, useLocation } from "react-router-dom";
import qs from "query-string";

import { CartContext } from "../../Contexts/CartContext";

import ProductSearch from "../ProductSearch/ProductSearch";
import "../../product/Products/Products.css";

ProductInfo.propTypes = {
  listProduct: PropTypes.array,
};

ProductInfo.defaultProps = {
  listProduct: [],
};

function ProductInfo(props) {
  const [listProduct, setListProduct] = useState([]);

  const [cart, setCart] = useContext(CartContext);

  let name = qs.parse(props.location.search).name;
  let lowPrice = qs.parse(props.location.search).lowPrice;
  let highPrice = qs.parse(props.location.search).highPrice;
  let authorname = qs.parse(props.location.search).authorName;
  let category = qs.parse(props.location.search).category;
  let publisher = qs.parse(props.location.search).publisher;

  if (name === undefined) {
    name = "";
  }
  if (lowPrice === undefined) {
    lowPrice = "0";
  }
  if (highPrice === undefined) {
    highPrice = "999999";
  }
  if (authorname === undefined) {
    authorname = "";
  }
  if (category === undefined) {
    category = "";
  }
  if (publisher === undefined) {
    publisher = "";
  }

  useEffect(() => {
    async function FetchListProducts() {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name,
          lowPrice: lowPrice,
          highPrice: highPrice,
          authorname: authorname,
          categoryId: category,
          publisherId: publisher,
        }),
      };

      const response = await fetch(
        `http://localhost:3001/api/products/search`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setListProduct(data);
        });
    }

    FetchListProducts();
  }, [props.location.search]);

  const addToCart = (key) => {
    // console.log(key._targetInst.key);
    console.log(key);
    //get index button onClick

    //filter get product from productList according to key button
    const tshirt = listProduct.filter((item) => {
      return item.productId === parseInt(key);
    });

    let tshirt1 = {
      id: tshirt[0].productId,
      image: tshirt[0].image,
      name: tshirt[0].name,
      authorname: tshirt[0].authorname,
      price: tshirt[0].price,
    };

    if (!tshirt.Array && tshirt.length > 0) {
      setCart((currentState) => [...currentState, tshirt1]);
    } else {
      setCart((currentState) => [...currentState, tshirt1]);
    }

    // const tshirt = { name: props.name, price: props.price };
    // setCart((currentState) => [...currentState, tshirt]);
  };

  localStorage.setItem("carts", JSON.stringify(cart));

  return (
    <div>
      <div className="ListProducts">
        <ul className="Products">
          <ProductSearch list={listProduct} addToCart={addToCart} />
        </ul>
      </div>
    </div>
  );
}

export default ProductInfo;
