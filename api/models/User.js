// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "journalist", "user"], default: "user" },

  divisionId: { type: mongoose.Schema.Types.ObjectId, ref: "Division" },
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
  upazilaId: { type: mongoose.Schema.Types.ObjectId, ref: "Upazila" }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
