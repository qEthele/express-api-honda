const mongoose = require("mongoose");
const DateNow = Date.now();

const billkinPlayerSchema = new mongoose.Schema({
  player_name: String,
  status: Number,
  retail: String,
  tel: Number,
  id: String,
  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Billkin", billkinPlayerSchema);
