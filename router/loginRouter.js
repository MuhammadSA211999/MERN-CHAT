// external imports
const express = require("express");
const router = express.Router();

// internal imports middleware and controller
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
//controller
const { getLogin } = require("../controller/loginController");


// login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
