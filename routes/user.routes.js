
const express = require("express")

const router = express.Router();

const userController = require("../controller/user.js")

router.post("/register", userController.userRegister);

router.post("/login", userController.login);

module.exports = router;
