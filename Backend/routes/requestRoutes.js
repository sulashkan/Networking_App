const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const requestController = require("../controllers/requestController");
const router = express.Router();

router.post("/interested/:id", authMiddleware, requestController.interested);
router.post("/ignore/:id", authMiddleware, requestController.ignorePost);
router.post("/accept/:id", authMiddleware, requestController.acceptRequest);
router.post("/reject/:id", authMiddleware, requestController.rejectRequest);

module.exports = router;
