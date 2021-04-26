import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';


function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to="/">MasterBUY</Link>
      </div>
      <div className="header-links">
        <Link to='/cart'>Cart
        {cartItems.length > 0  && (
          <span className="badge" >{cartItems.length}</span>
        )}
        </Link>
          {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}     
              {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
             </div>
    </header>
    <aside className="sidebar">
      <h3 >Shopping Categories</h3>
      <button className="sidebar-close-button" onClick={closeMenu}>x</button>
      <ul>
        <li>
          <Link to="/category/Pants">Pants</Link>
        </li>

        <li>
        <Link to="/category/Shirt">Shirts</Link>
        </li>

      </ul>
    </aside>

    <main className="main">
      <div className="content">
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/orders" component={OrdersScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/products" component={ProductsScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/signin" component={SigninScreen} />
      <Route path="/cart/:id?" component={CartScreen} /> 
      <Route path="/product/:id" component={ProductScreen} /> 
      <Route path="/category/:id" component={HomeScreen} />
      <Route path="/" exact={true} component={HomeScreen} />

      </div>

    </main>
    <footer className="footer">
      All right reserved.
    </footer>
  </div>
  </BrowserRouter>
  );
}

export default App;
