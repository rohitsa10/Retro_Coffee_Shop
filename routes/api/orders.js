var express = require("express");
var auth = require("../../middleware/auth");
var router = express.Router();

//Order model
const Order = require("../../model/Order_model");

//@Desc : Get all orders for user id
//@Access : Private
//@Route: /api/orders
router.get("/:userid", auth, (req, res) => {
  // console.log("userid",req.params.userid);
  Order.find({'user.id':req.params.userid})
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
});

//@Desc : Add an Order
//@Access : Private
//@Route: /api/orders
router.post("/", auth, (req, res) => {
    // console.log("incoming order",req.body.order);
    // console.log("incoming user",req.body.user);
  const newOrder = new Order({
    order: req.body.order,
    user: req.body.user,
    orderTotalAmount:req.body.orderTotalAmount,
    orderTotalQuantity:req.body.orderTotalQuantity
  });
  newOrder.save().then((order) => res.json(order))
  .catch(err => res.status(404).json(err));
});

//@Desc : Delete an order
//@Access : Private
//@Route: /api/orders/:id
router.delete("/:id", auth, (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
