const express = require("express");
const app = express();
app.set('trust proxy', 1);
const errorMiddleware = require("./middleWare/error");
const requestLogger = require("./middleWare/requestLogger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload"); // Used for image and other files
const path = require("path");
const cors = require("cors");
const contactRoute = require("./route/contactRoute");
require("dotenv").config({ path: "./config/config.env" }); // Loads config.env, including new OTP email vars

// Routes (Updated userRoute.js now includes OTP verification and rate limiting)
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const payment = require("./route/paymentRoute");
const health = require("./route/healthRoute");

// Add request logging middleware (only in development or when LOG_REQUESTS is true)
if (process.env.NODE_ENV === 'development' || process.env.LOG_REQUESTS === 'true') {
    app.use(requestLogger);
}

// Middleware for parsing and handling requests
app.use(cookieParser()); // For req.cookies to get token during authentication
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload()); // For handling file uploads (e.g., avatars in registration)
app.use(cors()); // Enable CORS for frontend requests

// Mount routes under /api/v1 (user routes now support OTP: /register sends OTP, /verify-otp creates account)
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", health);
app.use("/api", contactRoute);

// Error middleware must come after all routes
app.use(errorMiddleware);

// Serve static files from the frontend build directory
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/frotend/build")));

// Catch-all handler for React Router (serves index.html for any unmatched routes)
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "frotend", "build", "index.html"))
);

module.exports = app;