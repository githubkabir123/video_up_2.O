// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log(1)
    
    const { name, email, password, role, divisionId, districtId, upazilaId } = req.body;
    console.log(2)

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use." });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(3)
    // Create the user
    let newUser;
   if(!districtId){ 
      newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
      role,
      divisionId,
      districtId
    });
  }else{
      newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
      role,
      divisionId,
      districtId,
      upazilaId
    });
    }
console.log(4)
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Registration failed.", error: err.message });
  }
};

exports.login = async (req, res) => {
  console.log(req)
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        divisionId: user.divisionId,
        districtId: user.districtId,
        upazilaId: user.upazilaId
      }
    });
  } catch (err) {
    
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
};
