import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user'); // Populate allows to replace IDs within your data with other data
  res.send(orders);
});
router.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get("/:id", isAuth, async (req, res) => { // /api/orders/ defined in the route in server then /:id cames after them
  const order = await Order.findOne({ _id: req.params.id }); // isAuth means that only authonticated user can see order details
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems, // the item that the user passed as the body of this request
    user: req.user._id, // get it from isAuth middleware by next() function
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save(); // to create the order in the database
  res.status(201).send({ message: "New Order Created", data: newOrderCreated }); // 201 is the status of new item and send the order to fronend
});

router.put("/:id/pay", isAuth, async (req, res) => { //use put to update order status
  const order = await Order.findById(req.params.id); // use findById to get the order through mongoose from the DB -- id is the value that the user enter after /id
  if (order) { // if order exist update order info 
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID, // id of the transaction on paypal
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder }); // send the paid order to frontend
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

export default router;