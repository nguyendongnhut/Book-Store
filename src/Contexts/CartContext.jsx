import React, { useState } from "react";
import PropTypes from "prop-types";

CartProvider.propTypes = {};

export const CartContext = React.createContext();

function CartProvider(props) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
