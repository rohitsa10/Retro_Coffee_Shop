var express = require("express");
var auth = require("../../middleware/auth");
var router = express.Router();

//Item model
const Item = require("../../model/Item_model");

//@Desc : Get all Items
//@Access : Public
//@Route: /api/items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@Desc : Get specific Item
//@Access : Public
//@Route: /api/items/:id
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

//@Desc : Get category Items
//@Access : Public
//@Route: /api/items/category/:category
router.get("/category/:category", (req, res) => {
  // console.log("cat id",req.params.category);
  Item.find({ category: { $regex: req.params.category, $options: "i" } })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

//@Desc : Get named items
//@Access : Public
//@Route: /api/items/name/:name
router.get("/name/:name", (req, res) => {
  Item.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

//@Desc : Get named items within category
//@Access : Public
//@Route: /api/items/category/:category/name/:name
router.get("/category/:category/name/:name", (req, res) => {
  // console.log("cat id",req.params.category);
  // console.log("name id",req.params.name);
  Item.find({
    $and: [
      { category: req.params.category },
      { name: { $regex: req.params.name, $options: "i" } },
    ],
  })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

//@Desc : Update specific Item
//@Access : Private
//@Route: /api/items/:id
router.put("/:id", auth, (req, res) => {
  const updateItem = {
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    category: req.body.category,
    price: req.body.price,
    units: req.body.units,
    softDelete:req.body.softDelete
  };
  // console.log(updateItem);
  Item.findByIdAndUpdate({ _id: req.params.id }, updateItem, (err, update) => {
    if (err) res.status(500).send();
    else res.send(update);
  });
});

//@Desc : Add an Item
//@Access : Private
//@Route: /api/items
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    category: req.body.category,
    price: req.body.price,
    units: req.body.units,
  });
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(404).send(err));
});

//@Desc : Hard Delete an Item
//@Access : Private
//@Route: /api/items/:id
router.delete("/:id", auth, (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
