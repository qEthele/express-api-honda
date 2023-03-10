var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log(req.body);
  res.send("login data");
});

router.post("/", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "qwerty123456") {
    const data = true;
    res.send(data);
  } else {
    const data = false;
    res.send(data);
  }
});

module.exports = router;
