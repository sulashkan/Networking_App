const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1] || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorizised" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decode.useId);

    if (!user) return res.status(404).json({ error: "user not found" });

    req.user = user;

    next();
  } catch (err) {
    console.log("authmiddleware err", err);
    return res.status(401).json({ message: "Unauthorizised" });
  }
};
