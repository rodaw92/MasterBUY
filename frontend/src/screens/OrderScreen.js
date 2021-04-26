import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import PaypalButton from '../components/PaypalButton';
import emailjs from 'emailjs-com';
 

function OrderScreen(props) {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay  ) { // success pay is true or order exist but order id not equal to order id in the url, we need to refresh the page
      props.history.push("/profile");
      //document.location.href = '/profile';
    } else {
      dispatch(detailsOrder(props.match.params.id)); // to get the orderId from the url 
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult)); // result of user payment on paypal

    emailjs.send("service_gp8w46e","template_teuigli",userInfo, 'user_LAxKCjFy3YQOxFVnmjmi8');

  }

  const orderDetails = useSelector(state => state.orderDetails); // to get orderDetails from the redux store
  const { loading, order, error } = orderDetails;

  return loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant= 'danger'>{error}</MessageBox>) :

    <div>
      <h1>Order: {order._id}</h1>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? <MessageBox variant="success">Delivered at + {order.deliveredAt}</MessageBox> 
              : (<MessageBox variant="danger">Not Delivered.</MessageBox>)}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? <MessageBox variant="success">Paid at + {order.paidAt}</MessageBox> 
              : (<MessageBox variant="danger">Not Paid.</MessageBox>)}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Shopping Cart
          </h3>
                <div>
                  Price
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        ${item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} /> //runs after successful payment
              }
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;