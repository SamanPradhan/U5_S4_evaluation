const mongoose = require("mongoose");

const IPSchema = mongoose.Schema({
  IP_Adress: { type: String, required: true },
  city: { type: String, required: true },
});

const IPModel = mongoose.model("IP", IPSchema);

module.exports = { IPModel };
