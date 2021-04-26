import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "../constants/cartConstatnts";


function cartReducer(state={cartItems:[]}, action)
{
    switch(action.type){
        case CART_ADD_ITEM:
              const item= action.payload;
              const product =state.cartItems.find(x=>x.product === item.product) ;
             if(product){
            return{...state,cartItems:
                state.cartItems.map(x => x.product === product.product ? item : x)}; // x means that if the user didn't add new item just show the previous ones
                                                                                   // items means if the user enterd an already exists item the qty will modified
             }
         return{...state,cartItems:[...state.cartItems,item]};
         case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };
        case CART_SAVE_SHIPPING:
            return { ...state, shipping: action.payload };
            case CART_SAVE_PAYMENT:
                return { ...state, payment: action.payload };
                case CART_EMPTY:
                    return { ...state, cartItems : [] };
         default: 
            return state
                
    }
}
export { cartReducer }