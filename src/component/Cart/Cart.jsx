import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import { Products } from "../../product/Products/Products";
import PropTypes from "prop-types";

Cart.propTypes = {};

function Cart(props) {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div>
      <Link to="/cart">
        <span>items in cart: {cart.length}</span>
      </Link>
      <br />
      <span>total price: {totalPrice}</span>
    </div>
  );
}

export default Cart;
