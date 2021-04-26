import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
  USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_LOGOUT} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post("/api/users/signin", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));// this if the user close the screen and open it again  the data info will exist in cookie
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  }
    const signout = () => (dispatch) => {
      Cookie.remove("userInfo");
      Cookie.remove("cartItems");
      Cookie.remove("shippingAddress");
  dispatch({ type: USER_LOGOUT });
  document.location.href = '/signin';
    }
    
  const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
      const { data } = await Axios.post("/api/users/register", { name, email, password });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  }
  const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL , payload: message });
    }
  };
   const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/users/profile`, user, { // to end AJAX request to update user profile
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
  };
  export  {signin,signout, register,detailsUser,updateUserProfile};