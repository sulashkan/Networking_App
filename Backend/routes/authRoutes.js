const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const authController = require("../controllers/authController");
const { authMiddleware } = require('../middleware/authMiddleware');

router.post("/signup", [
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 6 }).withMessage('password at least 6 chars'),
  body('name').notEmpty().withMessage('name required'),
  body('profession').notEmpty().withMessage('profession required')
], authController.signup);


router.post("/login", [
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 6 }).withMessage('password at least 6 chars')
],authController.login);

router.get("/logout" , authMiddleware , authController.logout)

module.exports = router;