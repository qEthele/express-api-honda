const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Tmd = require("../models/tmd");
const AllData = require("../models/allData");

router.get("/", (req, res, next) => {
  Tmd.find((err, players) => {
    if (err) return next(err);
    res.json(players);
  });
});

router.post("/", (req, res, next) => {
  let check = AllData.findOne({ id: req.body.id }, (err, result) => {
    if (result === null) {
      console.log(true);

      Tmd.find((err, players) => {
        if (err) return next(err);
        //res.json(players);
        if (req.body.status === 1) {
          if (players.length < 50) {
            const data = {
              name: req.body.player_name,
              status: req.body.status,
              check: true,
              tel: req.body.tel,
              retail: req.body.retail,
              id: req.body.id,
            };
            Tmd.create(req.body, (err, post) => {
              if (err) return next(err);
              console.log("status 1");
              res.json(data);
              // res.send(data);
            });
          } else {
            const data = { player_name: req.body.player_name, status: 0 };
            res.send(data);
          }
        } else {
          const data = {
            player_name: req.body.player_name,
            status: req.body.status,
            check: true,
            tel: req.body.tel,
            retail: req.body.retail,
            id: req.body.id,
          };
          res.send(data);
        }
      });
    } else {
      const data = {
        player_name: req.body.player_name,
        status: req.body.status,
        check: false,
        tel: req.body.tel,
        retail: req.body.retail,
        id: req.body.id,
      };
      res.send(data);
    }
  });
});

router.delete("/", (req, res, next) => {
  Tmd.deleteMany((err, post) => {
    res.json(post);
  });
});

module.exports = router;
