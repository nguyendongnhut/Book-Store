import React from "react";

import Header from "../Header/Header";
import { Switch, Route, Router } from "react-router-dom";
import OrderDetail from "../../Pages/OrderDetail/OrderDetail";
import AllOrder from "../../Pages/AllOrder/AllOrder";
import OrderOfUser from "../../Pages/OrderOfUser/OrderOfUser";

function MainOrder(props) {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="container">
          <section className="Content">
            <Switch>
              <Route path="/order/detail/:orderId" component={OrderDetail} />
              <Route path="/order/all" component={AllOrder} />
              <Route path="/order/userId/:userId" component={OrderOfUser} />
            </Switch>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainOrder;
