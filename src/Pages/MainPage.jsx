import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../component/Header/Header";
import Products from "../product/Products/Products";
import Categories from "../component/Categories/Categories";
import Publishers from "../component/Publishers/Publishers";
import ProductDetail from "../component/ProductDetail/ProductDetail";
import ProductsByPublisher from "../product/ProductsByPublisher/ProductsByPublisher";
import ProductsByCategory from "../product/ProductsByCategory/ProductsByCategory";
// import AddProduct from "./component/AddProduct/AddProduct";
import ProductForm from "../component/ProductForm/ProductForm";

function MainPage() {
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
            <Route path="/add" component={ProductForm} />
            <Route
              path="/publisher/:publisherId"
              component={ProductsByPublisher}
            />
            <Route
              path="/category/:CategoryId"
              component={ProductsByCategory}
            />
            <Route exact path="" component={Products} />
            <Route path="/:productId" component={ProductDetail} />
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
