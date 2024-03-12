const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteById,
  createUser,
  updateById,
  getTweetsByUserId,
} = require("../controllers/userController.js");
const { createUserValidator } = require("../validators/user.js");

const { handleValidation } = require("../middlewares/index.js");

router.get("/", getAllUsers);

router.post("/" ,createUserValidator,handleValidation, createUser);

router.get("/:id", getUserById);

router.delete("/:id", deleteById);

router.put("/:id", updateById);

router.get("/:userId/tweets", getTweetsByUserId);

module.exports = router;
