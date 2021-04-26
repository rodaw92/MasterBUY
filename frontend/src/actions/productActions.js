import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
   PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, 
   PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_FAIL, 
   PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL, PRODUCT_CATEGORY_FAIL, PRODUCT_CATEGORY_SUCCESS, PRODUCT_CATEGORY_REQUEST } from "../constants/productConstants";
import axios from 'axios';
import Axios from 'axios';

const listProducts = (
  category = '',
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST }); // dipatch has an object {} and this object has a type
    const { data } = await axios.get( // to send AJAX request to the server
      '/api/products?category=' +
        category
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data }); // when getting the data from the server I return the data by payLoad
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};




const saveProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!product._id) {
        const { data } = await Axios.post('/api/products', product, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await Axios.put(
          '/api/products/' + product._id,
          product,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
  };
  
const detailsProduct = (productId) => async (dispatch) => {// use async when you need to use await
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId }); // define in payLoad productId to return to the user the product that selcted by the user
      const { data } = await axios.get('/api/products/' + productId);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  };

const deleteProdcut = (productId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete('/api/products/' + productId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
  };

export {listProducts, detailsProduct,saveProduct,deleteProdcut};