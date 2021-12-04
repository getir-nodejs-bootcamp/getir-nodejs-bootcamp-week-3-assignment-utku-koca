const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  putUser,
} = require("../controllers/userController");

const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/", verifyToken, updateUser);
router.put("/", verifyToken, putUser);
router.delete("/", verifyToken, deleteUser);

module.exports = router;
