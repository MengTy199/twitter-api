const express = require("express");
const router = express.Router();
// const passport = require("passport");
const {
  createUserValidator,
  loginUserValidator,
} = require("../validators/user.js");
const { validationErrorHandler, verifyToken } = require("../middlewares/index.js");
const {
  createUser,
  loginUser,
  googleLogin,
  handleGoogleLogin,
} = require("../controllers/userController.js");

router.post(
  "/register",
  createUserValidator,
  validationErrorHandler,
  createUser
);
router.post("/login", loginUserValidator, validationErrorHandler, loginUser);


router.get("/google-login",handleGoogleLogin); //like frontend
router.get("/google",googleLogin); // like backed for exchange token
router.get("/me",  verifyToken);
// router.get("/google/callback",  handleGoogleLogin);

module.exports = router;
