import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../component/Header/Header";
import Products from "../product/Products/Products";
import Categories from "../component/Categories/Categories";
import Publishers from "../component/Publishers/Publishers";
import ProductDetail from "../component/ProductDetail/ProductDetail";
import ProductsByPublisher from "../product/ProductsByPublisher/ProductsByPublisher";
import ProductsByCategory from "../product/ProductsByCategory/ProductsByCategory";
import ProductForm from "../component/ProductForm/ProductForm";
import AddPublisher from "../component/AddPublisher/AddPublisher";
import UpdatePublisher from "../component/UpdatePublisher/UpdatePublisher";

function MainPage() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <section className="Content">
          <div className="Right__Content">
            <Categories />
            <Publishers />
          </div>
          <div className="Left__Content">
            <Switch>
              <Route path="/products/AddProduct" component={ProductForm} />
              <Route path="/products/AddPublisher" component={AddPublisher} />
              <Route
                path="/products/UpdatePublisher"
                component={UpdatePublisher}
              />
              <Route
                path="/products/publisher/:publisherId"
                component={ProductsByPublisher}
              />
              <Route
                path="/products/category/:categoryId"
                component={ProductsByCategory}
              />
              <Route exact path="/products" component={Products} />
              <Route
                exact
                path="/products/:productId"
                component={ProductDetail}
              />
            </Switch>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainPage;
