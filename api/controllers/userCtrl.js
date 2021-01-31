const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// User registration
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ message: "This email already exists" });

  if (password.length < 6) return res.status(400).json({ message: "Password must be atleast 6 characters long" });

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashPassword });

  const accesstoken = createAccessToken({ id: newUser._id });
  const refreshtoken = createRefreshToken({ id: newUser._id });

  res.cookie("refreshtoken", refreshtoken, {
    httpOnly: true,
    path: "/api/users/refresh_token",
  });

  res.json({ accesstoken });
});

// User login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(user);

  if (!user) return res.status(400).json({ message: "User not found!" });

  console.log(user.password);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

  const accesstoken = createAccessToken({ id: user._id });
  const refreshtoken = createRefreshToken({ id: user._id });

  res.cookie("refreshtoken", refreshtoken, {
    httpOnly: true,
    path: "/api/users/refresh_token",
  });

  res.json({ accesstoken });
});

// User logout
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshtoken", { path: "/api/users/refresh_token" });
  res.json({ message: "Logged out" });
});

// Get user profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) return res.status(404).json({ message: "User doesn't exist!" });

  res.json(user);
});

// Refresh token
const refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ message: "Please Login or Register" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ message: "Please Login or Register" });

      const accesstoken = createAccessToken({ id: user.id });

      res.json({ accesstoken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAccessToken = id => {
  return jwt.sign(id, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
};

const createRefreshToken = id => {
  return jwt.sign(id, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};

module.exports = { register, login, logout, getProfile, refreshToken };
