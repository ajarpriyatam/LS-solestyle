import axiosInstance from "../services/axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_ADMIN_PRODUCT_FAIL,
  ALL_ADMIN_PRODUCT_REQUEST,
  ALL_ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  CLEAR_ERRORS,
} from "../constant/productConstant";

export const getProduct = () => async(dispatch)=>{
  try{
    dispatch({type:ALL_PRODUCT_REQUEST});
    let link = `/products`;
    const {data} = await axiosInstance.get(link)
    dispatch({
      type:ALL_PRODUCT_SUCCESS,
      payload:{
        visibleProducts: data.visibleProducts,
        visibleProductscount: data.visibleProducts?.length || 0
      },
    })
  }catch(error){
    dispatch({
      type:ALL_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message || "Failed to fetch products",
    });
  }
}

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axiosInstance.post(
      `/admin/product/new`,
      productData,
      config
    );
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axiosInstance.get(`/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

export const getAllProductsAdmin = () => async(dispatch)=>{
  try{
    dispatch({type:ALL_ADMIN_PRODUCT_REQUEST});
    let link = `/admin/products`;
    const {data} = await axiosInstance.get(link)
    dispatch({
      type:ALL_ADMIN_PRODUCT_SUCCESS,
      payload:data,
    })
  }catch(error){
    dispatch({
      type:ALL_ADMIN_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message || "Failed to fetch admin products",
    });
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axiosInstance.delete(`/admin/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || "Failed to delete product",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearDeleteSuccess = () => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_RESET });
};