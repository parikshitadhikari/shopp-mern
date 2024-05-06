import asyncHandel from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//creating new order, post: api/orders, private
const addOrderItems = asyncHandel(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingCharges,
    tax,
    totalPrice,
  } = req.body; //these comes in as a body of http request, from frontend

  if (orderItems && orderItems.length === 0) {
    // check if there is orderItems array and if it is empty
    res.status(400);
    throw new Error("No order items");
  } else {
    // else create a new order i.e if there are order items
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined, // we dont need order id
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingCharges,
      tax,
      totalPrice,
    });

    const createdOrder = await order.save(); //save the order in the database
    res.status(201).json(createdOrder);
  }
});

//get logged in user orders, get: api/orders/myorders, private
const getMyOrders = asyncHandel(async (req, res) => {
  //find all orders of the logged in user
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//get order by id, get: api/orders/:id, private
const getOrderById = asyncHandel(async (req, res) => {
  // req.params.id is the id of the order that is in the url
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // add name and email to the order, so from "user" collection, add "name email"

  if (order) {
    //if order is found then send the orderI
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

//update order to paid, put: api/orders/:id/pay, private
const updateOrderToPaid = asyncHandel(async (req, res) => {
  const order = await Order.findById(req.params.id); // get the order

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // these below will come from paypal after order is paid
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

//update order to delivered, put: api/orders/:id/deliver, private/admin
const updateOrderToDelivered = asyncHandel(async (req, res) => {
  //   const order = await Order.findById(req.params.id);

  //   if (order) {
  //     order.isDelivered = true;
  //     order.deliveredAt = Date.now();

  //     const updatedOrder = await order.save();
  //     res.json(updatedOrder);
  //   } else {
  //     res.status(404).json({ message: "Order not found" });
  //   }
  res.send("update order to delivered");
});

//get all orders, get: api/orders, private/admin
const getOrders = asyncHandel(async (req, res) => {
  // from user collection, populate the order with id and name
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
