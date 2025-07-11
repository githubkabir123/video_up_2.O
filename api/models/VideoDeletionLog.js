const mongoose = require("mongoose");

const videoDeletionLogSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  title: String,
  fileUrl: String,

  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deletedAt: { type: Date, default: Date.now },

  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  divisionId: { type: mongoose.Schema.Types.ObjectId, ref: "Division" },
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
  upazilaId: { type: mongoose.Schema.Types.ObjectId, ref: "Upazila" },
});

module.exports = mongoose.model("VideoDeletionLog", videoDeletionLogSchema);
