import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

import * as NumberToPrice from "../../constants/NumberToPrice";

Cart.propTypes = {};

function Cart(props) {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div>
      <Link to="/cart">
        <span>
          <FontAwesomeIcon icon={faCartPlus} />({cart.length})
        </span>
      </Link>
      <br />
      <span>
        <FontAwesomeIcon icon={faDollarSign} />:
        {NumberToPrice.Price(`${totalPrice}`) + "đ"}
      </span>
    </div>
  );
}

export default Cart;
