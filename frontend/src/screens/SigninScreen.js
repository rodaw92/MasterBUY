import React, { useEffect, useState } from 'react';
//import data from '../data';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {signin} from '../actions/userActions';
 
function SigninScreen (props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const userSignin = useSelector(state => state.userSignin); // to access signin from redux store
    const { loading, userInfo, error } = userSignin;

   const dispatch = useDispatch();
   const redirect = props.location.search ? props.location.search.split("=")[1] : '/'; // to redirect user to a new page

    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect); 
        }
        return () => {
            //
        };
    }, [userInfo]); //if user state is changed so the code after if will run

    const submitHandler = (e) => {
        e.preventDefault(); // because we don't want to refresh the sceen when the user click on signIn button
       dispatch(signin(email, password));
    
      }
   return  <div className="form">
   <form onSubmit={submitHandler} >
     <ul className="form-container">
       <li>
         <h2>Sign-In</h2>
       </li>
       <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
       <li>
         <label htmlFor="email">
           Email
         </label>
         <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
         </input>
       </li>
       <li>
         <label htmlFor="password">Password</label>
         <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
         </input>
       </li>
       <li>
         <button type="submit" className="button primary">Signin</button>
       </li>
       <li>
         New to MasterBUY?
       </li>
       <li>
       <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your amazona account</Link>
        </li>
     </ul>
   </form>
 </div>
            
}
export default SigninScreen;