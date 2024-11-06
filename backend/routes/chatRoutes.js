// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Fetch chat messages for a specific ride
router.get('/:rideId', async (req, res) => {
    try {
        const { rideId } = req.params;
        const messages = await Chat.find({ rideId }).populate('senderId', 'name');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Post a new message
router.post('/', async (req, res) => {
    try {
        const { rideId, senderId, message } = req.body;
        const newMessage = new Chat({ rideId, senderId, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
});

module.exports = router;
