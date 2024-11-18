const express = require("express");
const { sendMessage, getChatHistory } = require("../controller/chat");
const { protect } = require("../middleware/auth");
const router = express.Router();


router.post('/send', protect, sendMessage);
router.get('/history/:recipientId', protect, getChatHistory);

module.exports = router;