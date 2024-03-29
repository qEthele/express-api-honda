var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const ppKrit = require("./routes/ppKrit");
const billkin = require("./routes/billkin");
const nonTanon = require("./routes/nonTanon");
const tmd = require("./routes/tmd");
const allData = require("./routes/allData");
const login = require("./routes/login");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB", error));

// mongoose
//   .connect(
//     "mongodb+srv://admin:qwerty123456@cluster0.lc8pgpz.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("Connected"))
//   .catch(() => console.error(err));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ppKrit", ppKrit);
app.use("/billkin", billkin);
app.use("/nonTanon", nonTanon);
app.use("/tmd", tmd);
app.use("/allData", allData);
app.use("/login", login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.post("/login", (req, res) => {
//   console.log(req.body);

//   if (req.body.username === "admin" && req.body.password === "qwerty123456") {
//     const data = true;
//     res.send(data);
//   } else {
//     const data = false;
//     res.send(data);
//   }
// });

module.exports = app;
