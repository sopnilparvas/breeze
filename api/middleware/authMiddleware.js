const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const auth = asyncHandler((req, res, next) => {
  let token;

  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.status(401).json({ message: "Invalid authentication!" });

      req.user = user;

      next();
    });
  }

  if (!token) return res.status(401).json({ message: "Not authorized" });
});

const admin = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });

  if (user.role === 0) return res.status(401).json({ message: "Not authorized. Access denied!" });

  next();
});

module.exports = { auth, admin };
