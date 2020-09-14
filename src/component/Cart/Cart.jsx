import React, { useContext } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { Products } from "../../product/Products/Products";
import PropTypes from "prop-types";

Cart.propTypes = {};

function Cart(props) {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);
  console.log(cart);

  return (
    <div>
      <span>items in cart: {cart.length}</span>
      <br />
      <span>total price: {totalPrice}</span>
    </div>
  );
}

export default Cart;
