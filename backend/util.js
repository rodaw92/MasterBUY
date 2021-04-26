import jwt from 'jsonwebtoken';
import config from './config.js';

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET, // to encrypt the payload which is user data 
    {
      expiresIn: '48h',
    }
  );
};
const isAuth = (req, res, next) => { // it is like a middleware for express
  const token = req.headers.authorization; // get the authorization field from the header of this request

  if (token) {
    const onlyToken = token.slice(7, token.length); // to access only token part as the authorization format is Bearer XXXXXX
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => { // use JWT to decrypt the token // the third parameter is the callback function where decode contain data inside token
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' }); // 401 means that is unauthorized
      }
      req.user = decode; // check if the token is correct and fill req.user by the information of this user that define in sign function
      next(); // to pass the user as property of req to the next middleware
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) { // if the user exists and he is an admin
    return next();// means accept this request
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

export { getToken, isAuth, isAdmin };