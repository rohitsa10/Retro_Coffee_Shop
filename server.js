const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
// var cors = require("cors");

var app = express();
const port = process.env.PORT || 5000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//DB configuration
const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Mongoose connected"))
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
// app.use(cors());
app.use("/", require("./routes/index"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/orders", require("./routes/api/orders"));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static("frontend/build"));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname + "frontend/build/index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
