const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Upload (with auth and file middleware)
router.post("/upload", authMiddleware, upload.single("video"), videoController.uploadVideo);

router.get("/journalist/:userId", videoController.getVideosByJournalist);
router.get("/district/:districtId", videoController.getVideosByDistrict);
router.get("/upazila/:upazilaId", videoController.getVideosByUpazila);
router.get("/download/:id", videoController.downloadVideo);
router.delete("/:id", authMiddleware,videoController.deleteVideo);
router.get("/filter", videoController.getFilteredVideos);

// Admin-only access suggested
router.get("/deletion-logs", authMiddleware, videoController.getVideoDeletionLogs);


module.exports = router;
