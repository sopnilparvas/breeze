const router = require("express").Router();
const { register, login, logout, getProfile, refreshToken } = require("../controllers/userCtrl");
const { auth } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", auth, getProfile);
router.get("/refresh_token", refreshToken);

module.exports = router;
