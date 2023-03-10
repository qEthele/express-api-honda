const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AllData = require("../models/allData");

router.get("/", (req, res, next) => {
  AllData.find((err, players) => {
    if (err) return next(err);
    res.json(players);
  });
});

router.post("/", (req, res, next) => {
  AllData.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
    // res.send(data);
  });

  // Player.create(req.body, (err, post) => {
  //   if (err) return next(err);
  //   res.json(post);
  // });
});

router.delete("/", (req, res, next) => {
  AllData.deleteMany((err, post) => {
    res.json(post);
  });
});

module.exports = router;
