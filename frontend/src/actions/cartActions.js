import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from '../constants/cartConstatnts';
import Cookie from "js-cookie";
const addToCart=(productId, qty) => async (dispatch, getState) => { // use getState from thuk to use Cookie 
    try{
     const {data}=await Axios.get("/api/products/"+ productId);
     dispatch({
         type: CART_ADD_ITEM, payload:{
         product: data._id, // contains product id 
         name: data.name,
         image: data.image,
         price: data.price,
         countInStock: data.countInStock,
         qty
     }});
    const {cart:{cartItems}}= getState();
  Cookie.set("cartItems", JSON.stringify(cartItems)); // to save cart item in the cookie
    
    }catch(error){

    }
}
const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  }
const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  }
const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  }
export {addToCart, removeFromCart,saveShipping,savePayment};