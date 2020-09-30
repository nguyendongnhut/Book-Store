import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Link, useHistory } from "react-router-dom";

import Cart from "../../component/Cart/Cart";
import { CartContext } from "../../Contexts/CartContext";

import Header from "../../component/Header/Header";

import "./CartProduct.css";
import { useEffect } from "react";
import axios from "axios";

CartProduct.propTypes = {};

function CartProduct(props) {
  const history = useHistory();
  const [cart, setCart] = useContext(CartContext);

  // duyệt mảng gom các sản phẩm cùng mã tạo thành 1 mảng mới với count là số lượng sp cùng mã
  let newCart = cart.reduce(
    (function (hash) {
      return function (array, obj) {
        if (!hash[obj.id])
          array.push(
            (hash[obj.id] = {
              id: obj.id,
              name: obj.name,
              authorname: obj.authorname,
              image: obj.image,
              price: obj.price,
              count: 1,
            })
          );
        else hash[obj.id].count++;
        return array;
      };
    })({}),
    []
  );

  console.log(newCart);

  const deleteCartProduct = (key) => {
    console.log(key._targetInst.key);

    let deleteCart = cart.filter((item) => {
      return item.id != parseInt(key._targetInst.key);
    });

    setCart(deleteCart);
  };

  const decreaseCartProduct = (key) => {
    const index = cart.findIndex((x) => x.id === parseInt(key._targetInst.key));

    if (index > -1) {
      let decrease = cart.splice(index, 1);
    }
    // setCart(cart);
    setCart((currentState) => [...currentState]);
  };

  const increaseCartProduct = (key) => {
    const tshirt = cart.filter((item) => {
      return item.id === parseInt(key._targetInst.key);
    });

    let tshirt1 = {
      id: tshirt[0].id,
      image: tshirt[0].image,
      name: tshirt[0].name,
      authorname: tshirt[0].authorname,
      price: tshirt[0].price,
    };

    setCart((currentState) => [...currentState, tshirt1]);
    // console.log(e);
  };

  localStorage.setItem("carts", JSON.stringify(cart));

  // useEffect(() => {
  //   deleteCartProduct();
  //   increaseCartProduct();
  // }, [cart.length]);

  let products = JSON.parse(localStorage.getItem("carts"));
  console.log("product: ", products);

  // total price all products
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const addOrder = async (id) => {
    // const requestOptions = {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + sessionStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({
    //     totalPrice: totalPrice,
    //   }),
    // };

    // try {
    //   const res = await axios.post(
    //     "http://localhost:3001/api/cart/orders",
    //     requestOptions
    //   );

    //   console.log(res);
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     console.log("There was a problem with the server");
    //   } else {
    //     console.log(err.response.data.msg);
    //   }
    // }

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        totalPrice: totalPrice,
      }),
    };
    const response = await fetch(
      `http://localhost:3001/api/cart/orders`,
      requestOptions
    );

    const responseJSON = await response.json();
    id = responseJSON.data.insertId;
    return id;
  };

  // const getOrderId = () => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + sessionStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({
  //       totalPrice: totalPrice,
  //     }),
  //   };
  //   fetch(`http://localhost:3001/api/cart/orders`, requestOptions)
  //     .then((response) => console.log(response.json()))
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  // post detail order on server
  const detailOrders = async (id) => {
    const orderId = id;

    let newCart = cart.reduce(
      (function (hash) {
        return function (array, obj) {
          if (!hash[obj.id])
            array.push(
              (hash[obj.id] = {
                id: obj.id,
                name: obj.name,
                authorname: obj.authorname,
                image: obj.image,
                price: obj.price,
                count: 1,
                orderId: orderId,
              })
            );
          else hash[obj.id].count++;
          return array;
        };
      })({}),
      []
    );

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: newCart,
      }),
    };

    const response = await fetch(
      `http://localhost:3001/api/cart/orderDetails`,
      requestOptions
    );
  };

  async function Pay() {
    if (!sessionStorage.getItem("token")) {
      history.push("/login");
    }

    const id = await addOrder();
    // const orderId = getOrderId();
    console.log(id);

    detailOrders(id);
    setCart([]);
    history.push("/products");
  }

  let listCarts = newCart.map((item, index) => (
    <li key={item.id} className="Cart-products__product">
      <div className="Cart-products__items">
        <div className="Cart-products__img">
          <Link to="#">
            <img
              src={`http://localhost:3001/api/image/${item.image}`}
              alt={item.name}
            />
          </Link>
        </div>
        <div className="Cart-products__content">
          <div className="Cart-products__content--inner">
            <div className="Cart-products__desc">
              <Link to="#" className="Cart-products__name">
                <span className="Cart-products__badge">{item.name}</span>
              </Link>
              <span className="Cart-products__author">{item.authorname}</span>
              <p className="Cart-products__actions">
                <span
                  className="Cart-products__del"
                  onClick={deleteCartProduct}
                  key={item.id}
                >
                  delete
                </span>
              </p>
            </div>
            <div className="Cart-products__details">
              <div className="Cart-products__price">
                <p className="Cart-products__real-price">{item.price}</p>
              </div>
              <div className="Cart-products__qty">
                <div className="CartQty__StyledCartQty-o1bx97-0 iaIXXn">
                  <span
                    className="qty-decrease qty-disable"
                    onClick={decreaseCartProduct}
                    key={item.id}
                  >
                    -
                  </span>
                  <p className="qty-input">{item.count}</p>
                  <span
                    className="qty-increase"
                    onClick={increaseCartProduct}
                    key={item.id}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <div>
      <Header />
      <div className="main">
        <div className="Container-itwfbd-0 jFkAwY">
          <div className="Cart">
            <div className="Cart-products__inner">
              <ul className="Cart-products__products">{listCarts}</ul>
            </div>
            <div className="Cart-total-prices">
              <div className="Cart-total-prices__inner">
                <div className="CartPrices__StyledCartPrices-yhdjkc-0 ENgjL">
                  <div className="Prices">
                    <ul className="Prices__items">
                      <li className="Prices__item">
                        <span className="Prices__text">Tạm Tính</span>
                        <span className="Prices__value">{totalPrice}</span>
                      </li>
                    </ul>
                    <p className="Prices__total">
                      <span className="Prices__text">Thành Tiền</span>
                      <span className="Prices__value Prices__value--final">
                        {totalPrice}đ
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="Cart__submit"
                  onClick={() => Pay()}
                >
                  Tiến hành đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
