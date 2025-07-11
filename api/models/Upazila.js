const mongoose = require("mongoose");

const upazilaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division"
    // Optional, but you can make it required if needed
  }
}, { timestamps: true });

module.exports = mongoose.model("Upazila", upazilaSchema);
