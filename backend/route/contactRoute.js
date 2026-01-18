const express = require("express");
const router = express.Router();

const {
  sendContactMail,
} = require("../controller/contactController");

router.post("/contact", sendContactMail);

module.exports = router;
