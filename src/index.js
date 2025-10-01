import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";
import { CartProvider } from "./context/cart";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <CartProvider>
        <React.StrictMode>
          <Toaster />
          <App />
        </React.StrictMode>
      </CartProvider>
    </Provider>
  </BrowserRouter>
);