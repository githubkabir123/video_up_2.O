const Upazila = require("../models/Upazila");

exports.createUpazila = async (req, res) => {
  try {
    const upazila = new Upazila(req.body);
    await upazila.save();
    res.status(201).json(upazila);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUpazilas = async (req, res) => {
  try {
    const upazilas = await Upazila.find().populate("district division");
    res.json(upazilas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUpazilaById = async (req, res) => {
  try {
    const upazila = await Upazila.findById(req.params.id).populate("district division");
    if (!upazila) return res.status(404).json({ error: "Upazila not found" });
    res.json(upazila);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUpazila = async (req, res) => {
  try {
    const upazila = await Upazila.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!upazila) return res.status(404).json({ error: "Upazila not found" });
    res.json(upazila);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUpazila = async (req, res) => {
  try {
    const upazila = await Upazila.findByIdAndDelete(req.params.id);
    if (!upazila) return res.status(404).json({ error: "Upazila not found" });
    res.json({ message: "Upazila deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUpazilasByDistrict = async (req, res) => {
  try {
    const { districtId } = req.params;
    const upazilas = await Upazila.find({ district: districtId });
    res.status(200).json(upazilas);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch upazilas", error: error.message });
  }
};
