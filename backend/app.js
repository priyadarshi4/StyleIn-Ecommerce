const express = require("express");
const app = express();

// REQUIRED for Render / proxies
app.set("trust proxy", 1);

const errorMiddleware = require("./middleWare/error");
const requestLogger = require("./middleWare/requestLogger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// Routes
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const payment = require("./route/paymentRoute");
const health = require("./route/healthRoute");
const contactRoute = require("./route/contactRoute");
const chatRoute = require("./route/chatRoute");

// ================= LOGGER =================
if (
  process.env.NODE_ENV === "development" ||
  process.env.LOG_REQUESTS === "true"
) {
  app.use(requestLogger);
}

// ================= MIDDLEWARES =================
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

// ================= CORS =================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://style-in-ecommerce.vercel.app",
      "https://style-in.shop",
      "https://www.style-in.shop",
    ],
    credentials: true,
  })
);

app.options("*", cors());

// ================= ROUTES =================
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", health);
app.use("/api/v1", contactRoute);
app.use("/api/v1", chatRoute);

// ================= ERROR HANDLER =================
app.use(errorMiddleware);

module.exports = app;
