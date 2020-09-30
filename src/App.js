import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

// import Header from "./component/Header/Header";
// import Products from "./product/Products/Products";
// import Categories from "./component/Categories/Categories";
// import Publishers from "./component/Publishers/Publishers";
// import ProductDetail from "./component/ProductDetail/ProductDetail";
// import ProductsByPublisher from "./product/ProductsByPublisher/ProductsByPublisher";
// import ProductsByCategory from "./product/ProductsByCategory/ProductsByCategory";
// import AddProduct from "./component/AddProduct/AddProduct";
// import ProductForm from "./component/ProductForm/ProductForm";
import Login from "./Pages/Login/Login";
import MainPage from "./Pages/MainPage";
import PrivateRoute from "./helpers/PrivateRoute";

import Cart from "./component/Cart/Cart";
import CartProvider from "./Contexts/CartContext";
import CartProduct from "./Pages/CartProduct/CartProduct";

// import AddProduct from "./component/ProductForm/ProductForm";

function App() {
  return (
    <CartProvider>
      <div className="App">
        {/* <Header />
      <Login />
      <section className="Content">
        <div className="Right__Content">
          <Categories />
          <Publishers />
        </div>
        <div className="Left__Content">
          <Switch>
            <Route path="/products/add" component={ProductForm} />
            <Route
              path="/products/publisher/:publisherId"
              component={ProductsByPublisher}
            />
            <Route
              path="/products/category/:CategoryId"
              component={ProductsByCategory}
            />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:productId" component={ProductDetail} />
          </Switch>
        </div>
      </section> */}
        <Switch>
          <Route exact path="/login" component={Login} />

          <PrivateRoute path="/products" component={MainPage} />
          {/* <Route path="/products/add" component={AddProduct} /> */}
          <Route path="/cart" component={CartProduct} />
        </Switch>
      </div>
    </CartProvider>
  );
}

export default App;
