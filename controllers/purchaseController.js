const Razorpay = require("razorpay");
const Order = require("../models/order");

exports.puchasePremium = async (req, res, next) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = req.header("price");

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      console.log(1);

      const newOrder = new Order({
        orderId: order.id,
        paymentId: "PENDING",
        status: "PENDING",
        userId: req.user,
      });

      await newOrder.save();
      console.log(order);
      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (err) {
    console.log(err);
  }
};
