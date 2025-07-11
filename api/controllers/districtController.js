const District = require("../models/District");

exports.createDistrict = async (req, res) => {
  try {
    const district = new District(req.body);
    await district.save();
    res.status(201).json(district);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find().populate("division");
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDistrictById = async (req, res) => {
  try {
    const district = await District.findById(req.params.id).populate("division");
    if (!district) return res.status(404).json({ error: "District not found" });
    res.json(district);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!district) return res.status(404).json({ error: "District not found" });
    res.json(district);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);
    if (!district) return res.status(404).json({ error: "District not found" });
    res.json({ message: "District deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get districts by division ID
exports.getDistrictsByDivision = async (req, res) => {
  try {
    const { divisionId } = req.params;
    const districts = await District.find({ division: divisionId });
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch districts", error: error.message });
  }
};
