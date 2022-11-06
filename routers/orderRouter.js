import express from "express";
import userChaSchema from "../models/userSchema.js";
import orderChaSchema from "../models/orderSchema.js";

import { authMiddleware } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  // res.send("Message from ticket Router");
  next();
});

// Create new order
router.post("/api/orders", authMiddleware, async (req, res) => {
  const {
    shippinngAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    finalTotalAmount,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new orderChaSchema({
      user: req.user._id,
      shippinngAddress,
      paymentMethod,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      finalTotalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// Get order by Id
router.get("/api/orders/:_id", authMiddleware, async (req, res) => {
  const order = await orderChaSchema.findById(req.params._id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// Update order to paid
router.put("/api/orders/:_id/pay", authMiddleware, async (req, res) => {
  const orderUpdateById = await orderChaSchema.findById(req.params._id)

  if(orderUpdateById) {
    orderUpdateById.isPaid = true
    orderUpdateById.paidAt = Date.now()
    orderUpdateById.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const orderUpdation = await orderUpdateById.save()

    res.json(orderUpdation)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

router.get("/api/order/myorders", authMiddleware, async (req, res) => {
  const order = await orderChaSchema.find({user: req.user._id})
    res.json(order)
})

export const orderRouter = router;
