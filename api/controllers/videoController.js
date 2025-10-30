const Video = require("../models/Video");
const VideoDeletionLog = require("../models/VideoDeletionLog");
const fs = require("fs");
const path = require("path");

// Upload video
// exports.uploadVideo = async (req, res) => {
//   try {
//     const { title } = req.body;
//     const fileUrl = `/uploads/videos/${req.file.filename}`;
//     const user = req.user; // Comes from auth middleware

//     const newVideo = new Video({
//   title,
//   fileUrl,
//   uploadedBy: user.userId,
//   ...(user.divisionId && { divisionId: user.divisionId }),
//   ...(user.districtId && { districtId: user.districtId }),
//   ...(user.upazilaId && { upazilaId: user.upazilaId })
// });

//     await newVideo.save();
//     res.status(201).json({ message: "Video uploaded", video: newVideo });
//   } catch (err) {
//     res.status(500).json({ message: "Upload failed", error: err.message });
//   }
// };
exports.uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const user = req.user; // from auth middleware
    const io = req.app.get("io"); // Socket.IO instance
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });
    if (!title) return res.status(400).json({ message: "Title is required" });

    // Multer already saved the file at file.path
    const filePath = file.path; // e.g. uploads/videos/12345.mp4
    const fileSize = fs.statSync(filePath).size;

    // Optional: simulate progress
    let uploaded = 0;
    const readStream = fs.createReadStream(filePath);

    readStream.on("data", (chunk) => {
      uploaded += chunk.length;
      const percent = Math.round((uploaded / fileSize) * 100);
      io.emit("uploadProgress", { percent });
    });

    readStream.on("end", async () => {
      const newVideo = new Video({
        title,
        fileUrl: `/uploads/videos/${file.filename}`,
        uploadedBy: user.userId,
        ...(user.divisionId && { divisionId: user.divisionId }),
        ...(user.districtId && { districtId: user.districtId }),
        ...(user.upazilaId && { upazilaId: user.upazilaId })
      });

      await newVideo.save();
      io.emit("uploadProgress", { percent: 100 });
      res.status(201).json({ message: "Video uploaded", video: newVideo });
    });

    readStream.on("error", (err) => {
      io.emit("uploadError", { error: err.message });
      res.status(500).json({ message: "Upload failed", error: err.message });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get videos uploaded by a specific journalist
exports.getVideosByJournalist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const videos = await Video.find({ uploadedBy: userId })
      .populate("uploadedBy", "name")
      .populate("divisionId", "name")
      .populate("districtId", "name")
      .populate("upazilaId", "name");

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
};

// Get videos by district
const mongoose = require("mongoose");
const { Types } = mongoose;

exports.getVideosByDistrict = async (req, res) => {
  console.log("Req from District");
  try {
    const districtId = req.params.districtId;

    const allVideos = await Video.find({
      districtId,
      divisionId: { $ne: null },
    })
      .populate("uploadedBy", "name")
      .populate("divisionId", "name")
      .populate("districtId", "name")
      .populate("upazilaId", "name");

    // Manually filter only those without a valid upazilaId
    const filteredVideos = allVideos.filter((v) => {
      return (
        !v.upazilaId || // null, undefined
        typeof v.upazilaId === "string" || // empty string
        (Types.ObjectId.isValid(v.upazilaId) === false)
      );
    });

    res.json(filteredVideos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
};




// Get videos by upazila
exports.getVideosByUpazila = async (req, res) => {
  try {
    const upazilaId = req.params.upazilaId;

    const videos = await Video.find({ upazilaId })
      .populate("uploadedBy", "name")
      .populate("divisionId", "name")
      .populate("districtId", "name")
      .populate("upazilaId", "name");

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  // console.log("this is user",req.user)
  try {
    if (!req.user) {
      // console.log("No User 401")
      return res.status(401).json({ message: "Unauthorized: No user info" });
    }

    const videoId = req.params.id;
    const user = req.user; // from auth middleware

    const video = await Video.findById(videoId);
    console.log(req.params.id)
    console.log(video)
    if (!video) {console.log("Video Not found")};
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Save deletion log
    await new VideoDeletionLog({
      videoId: video._id,
      title: video.title,
      fileUrl: video.fileUrl,
      deletedBy: user.userId,          // Who deleted the video
      uploadedBy: video.uploadedBy,    // Who uploaded it
      divisionId: video.divisionId,    // From the video itself
      districtId: video.districtId,    // From the video itself
      upazilaId: video.upazilaId       // From the video itself
    }).save();


    // Delete file
    const filePath = path.join(__dirname, "..", video.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete DB entry
    await video.deleteOne();

    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete video", error: err.message });
  }
};

// Download video
exports.downloadVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const filePath = path.join(__dirname, "..", video.fileUrl);
    res.download(filePath); // Triggers file download
  } catch (err) {
    res.status(500).json({ message: "Failed to download video", error: err.message });
  }
};

exports.getFilteredVideos = async (req, res) => {
  console.log("Req from Filter");
  const { districtId, upazilaId } = req.query;

  const query = {};

  if (upazilaId && upazilaId !== "") {
    // Case: Upazila selected
    query.upazilaId = upazilaId;
  } else if (districtId && districtId !== "") {
    // Case: Only District selected, and we want videos WITHOUT upazila
    query.districtId = districtId;
    query.$or = [
      { upazilaId: { $exists: false } },
      { upazilaId: null },
    ];
  }

  try {
    const videos = await Video.find(query)
      .populate("uploadedBy", "name")
      .populate("divisionId", "name")
      .populate("districtId", "name")
      .populate("upazilaId", "name");

    res.json(videos);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching videos", error: err.message });
  }
};

exports.getVideoDeletionLogs = async (req, res) => {
  try {
    const logs = await VideoDeletionLog.find()
      .populate("deletedBy", "name email role")
      .populate("uploadedBy", "name email")
      .populate("divisionId", "name")
      .populate("districtId", "name")
      .populate("upazilaId", "name")
      .sort({ deletedAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch deletion logs", error: err.message });
  }
};
