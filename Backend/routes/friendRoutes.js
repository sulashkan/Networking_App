const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const friendController = require("../controllers/friendController");
const router = express.Router();

router.get("/" , authMiddleware , friendController.friendList);
router.get('/requests', authMiddleware, friendController.friendRequests )

module.exports = router;