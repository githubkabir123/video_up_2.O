// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");

// Get all journalists in a district (editors/admins only)
router.get("/district/:districtId", authMiddleware, roleMiddleware("editor", "admin"), userController.getJournalistsByDistrict);
// Get all User  (admins only)
router.get("/", authMiddleware, roleMiddleware( "admin"), userController.getAllUsers);
router.get("/:id", authMiddleware, roleMiddleware( "admin"), userController.getUserById);
router.put("/:id", authMiddleware, roleMiddleware( "admin"), userController.updateUser);
router.delete("/:id", authMiddleware, roleMiddleware( "admin"), userController.deleteUser);
// router.post("/", authMiddleware, roleMiddleware( "admin"), userController.addUser);
router.post("/", userController.addUser);
module.exports = router;
