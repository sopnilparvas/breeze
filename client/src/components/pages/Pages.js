import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Products from "./products/Products";
import ProductDetails from "./product_details/ProductDetails";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";

function Pages() {
  return (
    <Switch>
      <Route path='/' exact component={Products} />
      <Route path='/details/:id' exact component={ProductDetails} />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/cart' exact component={Cart} />
      <Route path='*' exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
