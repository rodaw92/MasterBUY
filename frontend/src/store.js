import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer, productsListCategoryReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';
import Cookie from "js-cookie";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderListReducer,
    orderListReducer,
    orderDeleteReducer,
    orderDeliverReducer,
  } from './reducers/orderReducers';
  

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null; // means the userInfo is based on the data that get from the user

const initialState ={cart: {cartItems, shipping: {}, payment: {}}, userSignin: { userInfo }, };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    productsListCategory: productsListCategoryReducer,


})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // to see the state of actions in developer mode in the browser
const store = createStore( reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;