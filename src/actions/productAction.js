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
  CLEAR_ERRORS,
} from "../constant/productConstant";

export const getProduct = () => async(dispatch)=>{
  try{
    dispatch({type:ALL_PRODUCT_REQUEST});
    let link = `/products`;
    const {data} = await axiosInstance.get(link)
    console.log("data",data);
    dispatch({
      type:ALL_PRODUCT_SUCCESS,
      payload:data,
    })
  }catch(error){
    dispatch({
      type:ALL_PRODUCT_FAIL,
      payload:`${error.response.data.message}`,
    });

  }
}

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log("qwertyuiop[xxxx",productData);
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
    console.log("data",data);
    dispatch({
      type:ALL_ADMIN_PRODUCT_SUCCESS,
      payload:data,
    })
  }catch(error){
    dispatch({
      type:ALL_ADMIN_PRODUCT_FAIL,
      payload:`${error.response.data.message}`,
    });

  }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};