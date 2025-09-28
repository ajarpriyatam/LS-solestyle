import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
  newProductReducer,
  productDetailsReducer,
  productsReducer,
  productsReducerAdmin,
  deleteProductReducer
} from "./reducers/productReducers";
// import { products } from "./constants";
// import {
//   profileReducer,
//   userReducer,
// } from "./reducers/userReducres";
// import {
//   allOrdersReducer,
//   myOrdersReducer,
//   orderDetailsReducer,
// } from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer, // ← Added missing comma here
  // user: userReducer,
  // profile: profileReducer,
  // myOrders: myOrdersReducer,
  // orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  productsAdmin: productsReducerAdmin,
  deleteProduct: deleteProductReducer,
  // allOrders: allOrdersReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

export default store;