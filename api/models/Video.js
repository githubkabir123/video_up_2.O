// models/Video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  divisionId: { type: mongoose.Schema.Types.ObjectId, ref: "Division" },
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
  upazilaId: { type: mongoose.Schema.Types.ObjectId, ref: "Upazila" }

}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);
