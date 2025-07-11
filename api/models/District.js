// models/District.js
const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("District", districtSchema);
