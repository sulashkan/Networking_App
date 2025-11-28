const express = require('express');
const { allUsers } = require('../controllers/feedController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/', authMiddleware , allUsers);

module.exports = router;