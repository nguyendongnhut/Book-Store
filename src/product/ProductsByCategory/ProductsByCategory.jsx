import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProductSearch from "../../component/ProductSearch/ProductSearch";
import { CartContext } from "../../Contexts/CartContext";
import "./ProductsByCategory.css";
import "../Products/Products.css";

ProductsByCategory.propTypes = {
  listCategory: PropTypes.array,
};

ProductsByCategory.defaultProps = {
  listCategory: [],
};

function ProductsByCategory() {
  const [listCategory, setListCategory] = useState([]);
  const [cart, setCart] = useContext(CartContext);

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

  const addToCart = (key) => {
    // console.log(key._targetInst.key);
    console.log(key);
    //get index button onClick

    //filter get product from productList according to key button
    const tshirt = listCategory.filter((item) => {
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

  return (
    // <div className="ListProductCategory">
    //   <ul className="ProductCategory">
    //     {listCategory.map((item) => (
    //       <li key={item.productId} className="ProductCategory__item">
    //         <div className="ProductCategory__info">
    //           <div className="ProductCategory__img">
    //             <img src={item.image} alt={item.name} />
    //           </div>
    //           <div className="ProductCategory__title">
    //             <Link
    //               to={`/products/${item.productId}`}
    //               className="ProductCategory__name-title"
    //               title={item.name}
    //             >
    //               {item.name.length > 15
    //                 ? item.name.substr(0, 15) + "..."
    //                 : item.name}
    //             </Link>
    //           </div>
    //           <div className="ProductCategory__author">
    //             <p className="ProductCategory__name-author">
    //               <Link to="#">{item.TenTacGia}</Link>
    //               <p>{item.description}</p>
    //             </p>
    //           </div>
    //           {/* <div className="ProductCategory__price">{`${item.GiaSanPham} VNĐ`}</div> */}
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="ListProducts">
      <ul className="Products">
        <ProductSearch list={listCategory} addToCart={addToCart} />
      </ul>
    </div>
  );
}

export default ProductsByCategory;
