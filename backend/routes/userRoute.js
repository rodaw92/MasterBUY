import express from 'express';
import { getToken, isAuth } from '../util.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (signinUser) {
      res.send({  // send back the data about this user
        _id: signinUser.id,
        name: signinUser.name, 
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser), 
      }); 
    } else {
      res.status(401).send({ message: 'Invalid Email or Password.' });
    }
  });

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,  // req.body from body-parser
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});


   
router.get("/createadmin", async (req, res)=>{
    try{
    const user= new User({
        name: 'Rody',
        email: 'raed@hotmail.com',
        password:'1234',
        isAdmin:true
    });
    const newUser= await user.save();
    res.send(newUser);
}
    catch (error){
     res.send({msg: error.message})
    };
})

router.get('/:id',expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  }) 
);

router.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8); // to encrypt user Passworrdd
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: getToken(updatedUser),
      });
    }
  })
);
export default router;