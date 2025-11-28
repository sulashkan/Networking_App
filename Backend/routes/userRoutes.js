const express = require('express');
const { userProfile, userProfileEdit } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware , userProfile);
router.patch('/profile/update', authMiddleware , userProfileEdit);

module.exports = router;