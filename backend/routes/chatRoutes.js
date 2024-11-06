// backend/routes/chatRoutes.js
const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to send a chat message
router.post('/send', authMiddleware, sendMessage);

// Route to get messages for a specific ride
router.get('/:rideId', authMiddleware, getMessages);

module.exports = router;
