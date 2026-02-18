const express = require("express");
const { isAuthenticatedUser } = require("../middleWare/auth");
const { getReminderProducts } = require("../controller/aiController");

const router = express.Router();

router.get("/reminders", isAuthenticatedUser, getReminderProducts);

module.exports = router;
