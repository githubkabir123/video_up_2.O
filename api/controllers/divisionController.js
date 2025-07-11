const Division = require("../models/Division");

exports.createDivision = async (req, res) => {
  try {
    const division = new Division(req.body);
    await division.save();
    res.status(201).json(division);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDivisions = async (req, res) => {
  try {
    const divisions = await Division.find();
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDivisionById = async (req, res) => {
  try {
    const division = await Division.findById(req.params.id);
    if (!division) return res.status(404).json({ error: "Division not found" });
    res.json(division);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDivision = async (req, res) => {
  try {
    const division = await Division.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!division) return res.status(404).json({ error: "Division not found" });
    res.json(division);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDivision = async (req, res) => {
  try {
    const division = await Division.findByIdAndDelete(req.params.id);
    if (!division) return res.status(404).json({ error: "Division not found" });
    res.json({ message: "Division deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
