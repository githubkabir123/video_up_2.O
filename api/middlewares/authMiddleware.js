// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  console.log("req come")
  // console.log(req.headers.authorization)
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token)
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user) return res.status(401).json({ message: "User not found" });
// console.log(user)
    req.user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      divisionId: user.divisionId,
      districtId: user.districtId,
      upazilaId: user.upazilaId
    };
// console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

module.exports = authMiddleware;
