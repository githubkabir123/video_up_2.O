const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Get journalists by District
exports.getJournalistsByDistrict = async (req, res) => {
  try {
    const districtId = req.params.districtId;
    const journalists = await User.find({ districtId, role: "journalist" }).select("-passwordHash");
    res.json(journalists);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch journalists", error: err.message });
  }
};

// Get all users with division, district, upazila populated
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("divisionId", "name")
      .populate("districtId", "name")
      .populate("upazilaId", "name");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};


// Get single user by ID with location populated
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("divisionId", "name")
      .populate("districtId", "name")
      .populate("upazilaId", "name");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, divisionId, districtId, upazilaId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, divisionId, districtId, upazilaId },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

// Add new user (admin creation)
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role, divisionId, districtId, upazilaId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      passwordHash,
      role,
      divisionId,
      districtId,
      upazilaId
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};
