// external imports
const express = require("express");

// internal imports
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUploads = require("../middlewares/common/users/avatarUploads");
const usersValidator = require("../middlewares/common/users/usersValidator");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Users"), getUsers);
//avatarUploads
router.post('/', avatarUploads, usersValidator)
module.exports = router;
