import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
// more imports here
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminRoute from "./auth/helper/AdminRoute";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import Profile from "./user/Profile";
import userDashBoard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={userDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute path="/admin/categories" component={ManageCategories} />
        <AdminRoute path="/admin/create/product" component={AddProduct} />
        <AdminRoute path="/admin/products" component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
