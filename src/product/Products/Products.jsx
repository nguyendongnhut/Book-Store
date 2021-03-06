import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Pagination from "../../component/Pagination/Pagination";

import { CartContext } from "../../Contexts/CartContext";

import "./Products.css";
import Cart from "../../component/Cart/Cart";

import * as NumberToPrice from "../../constants/NumberToPrice";
import ProductSearch from "../../component/ProductSearch/ProductSearch";

Products.propTypes = {
  products: PropTypes.array,
};

Products.defaultProps = {
  products: [],
};

function Products(props) {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);

  const [cart, setCart] = useContext(CartContext);

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
  }, [page]);

  const start = (page - 1) * perPage;
  const end = page * perPage;

  // cut list product when page change
  const currentProduct = productList.slice(start, end);

  // get total page
  const totalPage = Math.ceil(productList.length / perPage);

  const paginate = (number) => {
    setPage(number);
  };

  // button back
  const pre = () => {
    if (page < 2) {
      setPage(totalPage);
    } else {
      setPage(page - 1);
    }
  };

  // button next
  const next = () => {
    if (page > totalPage - 1) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  const addToCart = (key) => {
    // console.log(key._targetInst.key);
    console.log(key);
    //get index button onClick

    //filter get product from productList according to key button
    const tshirt = productList.filter((item) => {
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

  // let ListProduct = currentProduct.map((item) => (
  //   <li key={item.productId} className="Products__item">
  //     <div className="Products__info">
  //       <div className="Products__img">
  //         <img
  //           src={`http://localhost:3001/api/image/${item.image}`}
  //           alt={item.name}
  //         />
  //       </div>
  //       <div className="Products__title">
  //         <Link
  //           to={`/products/${item.productId}`}
  //           className="Products__name-title"
  //           title={item.name}
  //         >
  //           {item.name.length > 15
  //             ? item.name.substr(0, 15) + "..."
  //             : item.name}
  //         </Link>
  //       </div>
  //       <div className="Products__author">
  //         <p className="Products__name-author">
  //           <Link to="#">{item.authorname}</Link>
  //         </p>
  //       </div>
  //       <div className="Products__price">
  //         <p>{NumberToPrice.Price(`${item.price}`) + "đ"}</p>
  //       </div>
  //       <div className="Products__Add">
  //         <button
  //           onClick={addToCart}
  //           key={item.productId}
  //           className="Products__Add-button"
  //         >
  //           Add to cart
  //         </button>
  //       </div>
  //     </div>
  //   </li>
  // ));

  return (
    <div className="ListProducts">
      <ul className="Products">
        <ProductSearch list={currentProduct} addToCart={addToCart} />
      </ul>
      <Pagination
        perPage={perPage}
        totalProduct={productList.length}
        paginate={paginate}
        pre={pre}
        next={next}
      />
    </div>
  );
}

export default Products;
