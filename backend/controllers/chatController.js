// backend/controllers/chatController.js
const Chat = require('../models/Chat');

// Send a chat message
const sendMessage = async (req, res) => {
    const { rideId, message } = req.body;

    try {
        const chatMessage = new Chat({
            rideId,
            senderId: req.user.id, // Assuming req.user is set by authMiddleware
            message,
        });
        await chatMessage.save();
        res.status(201).json({ message: 'Message sent', chatMessage });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};

// Get messages for a specific ride
const getMessages = async (req, res) => {
    const { rideId } = req.params;

    try {
        const messages = await Chat.find({ rideId }).populate('senderId', 'username'); // Assuming User model has a username field
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};

module.exports = { sendMessage, getMessages };
