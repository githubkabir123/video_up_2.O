// api/index.js
const app = require('./app');
const dotenv = require("dotenv");

dotenv.config();
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
//module.exports = app; // Vercel runs this as a serverless function
