// api/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// OPTIONAL: If you want to make sure preflight works on all routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', corsOptions.methods.join(','));
    res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
    return res.sendStatus(200);
  }
  next();
});


// Create HTTP + Socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:  process.env.FRONTEND_URL || '*', // You can restrict this later
    methods: ["GET", "POST"]
  }
});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴 User disconnected"));
});

// Make io globally available
app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const allRoutes = require("./routes/allRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/allroutes", allRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express API on Vercel!' });
});

// DB Connect (will be called on every invocation — OK for serverless)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
