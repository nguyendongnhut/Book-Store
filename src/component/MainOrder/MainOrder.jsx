import React from "react";

import Header from "../Header/Header";
import { Switch, Route } from "react-router-dom";
import OrderDetail from "../../Pages/OrderDetail/OrderDetail";

function MainOrder(props) {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="container">
          <section className="Content">
            <Switch>
              <Route path="/order/detail/:orderId" component={OrderDetail} />
            </Switch>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainOrder;
