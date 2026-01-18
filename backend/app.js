const express = require("express");
const app = express();
app.set("trust proxy", 1);

const errorMiddleware = require("./middleWare/error");
const requestLogger = require("./middleWare/requestLogger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const contactRoute = require("./route/contactRoute");

require("dotenv").config({ path: "./config/config.env" });

// Routes
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const payment = require("./route/paymentRoute");
const health = require("./route/healthRoute");

// Logger
if (process.env.NODE_ENV === "development" || process.env.LOG_REQUESTS === "true") {
  app.use(requestLogger);
}

// ✅ MIDDLEWARES FIRST
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors());

// ✅ TEST ROUTE — CORRECT PLACE
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is connected successfully 🚀",
    time: new Date().toISOString(),
  });
});

// ✅ MAIN API ROUTES
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", health);
app.use("/api", contactRoute);

// Error handler (LAST)
app.use(errorMiddleware);

// ❌ DO NOT SERVE FRONTEND FROM BACKEND (Vercel handles frontend)
module.exports = app;
