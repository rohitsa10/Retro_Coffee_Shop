const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

//Item model
const User = require("../../model/User_model");

//@Desc : Get all Users
//@Access : Public
//@Route: /api/users
router.get("/", (req, res) => {
  User.find().then((users) => res.json(users));
});

//@Desc : Add a User
//@Access : Public
//@Route: /api/users
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //validate
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill in required details" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "Email already exists" });

    const newUser = new User({ name, email, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            {
              id: user.id,
            },
            config.get("jwtSecret"),
            {
              expiresIn: 3600, //1hour
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin
                },
              });
            }
          );
        });
      });
    });
  });
});

//@Desc : Delete a User
//@Access : Public
//@Route: /api/users/:id
router.delete("/:id", (req, res) => {});

module.exports = router;
