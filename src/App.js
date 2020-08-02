import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./component/Header/Header";
import Products from "./product/Products/Products";
import Categories from "./component/Categories/Categories";
import Publishers from "./component/Publishers/Publishers";
import ProductDetail from "./component/ProductDetail/ProductDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <section className="Content">
        <div className="Right__Content">
          <Categories />
          <Publishers />
        </div>
        <div className="Left__Content">
          <Switch>
            <Route path="/products" exact component={Products} />
            <Route path="/products/:productId" component={ProductDetail} />
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default App;
