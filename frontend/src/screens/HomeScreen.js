import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function HomeScreen(props) {

  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(listProducts(category)); 
  
    return () => { 
      //
    }; 
  }, [category]);


  return (
    <>
    <div className= 'catname'>
      {category && <h2>{category}</h2>}
      </div>
      
      {loading ? (
       <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : ( 
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className='card'>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
