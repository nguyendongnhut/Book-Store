import React, { useState } from "react";
import PropTypes from "prop-types";

CartProvider.propTypes = {};

export const CartContext = React.createContext();

function CartProvider(props) {
  // if (!localStorage.getItem("carts")) {
  //   const [cart, setCart] = useState([]);
  // } else {
  //   const [cart, setCart] = useState(JSON.parse(localStorage.getItem("carts")));
  // }

  const [cart, setCart] = useState(
    !localStorage.getItem("carts")
      ? []
      : JSON.parse(localStorage.getItem("carts"))
  );

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
