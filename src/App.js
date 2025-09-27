import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/Products";
import CartPage from "./pages/CartPage";
import TrackOrder from "./pages/TrackOrder";
import LoginSignUp from "./pages/signup/LoginSignUp";
import PrivateRoute from "./routes/private";
import AdminRoute from "./routes/adminRoute";
import Layout from "./admin/layout/Layout";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./pages/user/Order";
import Profile from "./pages/user/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/:category/collection" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders/tracking" element={<TrackOrder />} />
      <Route path="/account" element={<LoginSignUp />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      <Route path="/" element={<AdminRoute />}>
        <Route path="admin/*" element={<Layout />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
