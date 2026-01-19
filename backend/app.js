const express = require("express");
const app = express();

// ✅ REQUIRED for Render + rate-limit + real IPs
app.set("trust proxy", 1);

const errorMiddleware = require("./middleWare/error");
const requestLogger = require("./middleWare/requestLogger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const contactRoute = require("./route/contactRoute");

require("dotenv").config({ path: "./config/config.env" });

// Routes
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const payment = require("./route/paymentRoute");
const health = require("./route/healthRoute");

// ================== LOGGER ==================
if (
  process.env.NODE_ENV === "development" ||
  process.env.LOG_REQUESTS === "true"
) {
  app.use(requestLogger);
}

// ================== MIDDLEWARES ==================
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

// ✅ SAFE CORS (production + localhost)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://style-in-ecommerce.vercel.app",
      "https://style-in.shop",
      "https://www.style-in.shop",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Allow preflight requests
app.options("*", cors());

// ================== TEST ROUTE ==================
// (Remove later if you want)
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is connected successfully 🚀",
    time: new Date().toISOString(),
  });
});

// ================== API ROUTES ==================
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", health);
app.use("/api/v1", contactRoute);

// ================== ERROR HANDLER ==================
app.use(errorMiddleware);

// ❌ DO NOT serve frontend here (Vercel handles frontend)
module.exports = app;
