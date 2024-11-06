// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Chat = require('./models/Chat');
const cors = require('cors');
const http = require('http'); // Import http to create the server
const socketIO = require('socket.io'); // Import socket.io

// Initialize environment variables
dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIO(server); // Initialize Socket.IO

// CORS configuration to allow frontend to access the backend
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only this frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type ,Authorization'],
    credentials: true, // Allow cookies to be sent
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use(express.json()); // To parse JSON bodies

// Database connection
const connectDB = require('./config/db');
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/chats', chatRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a specific ride's chat room
    socket.on('joinRoom', ({ rideId }) => {
        socket.join(rideId);
    });

    // Handle new chat message
    socket.on('chatMessage', async (message) => {
        const { rideId, senderId, text } = message;

        // Save message to the database for both users
        const chatMessage = new Chat({
            rideId,
            senderId,
            message: text,
        });

        await chatMessage.save();

        // Emit message to other users in the room
        io.to(rideId).emit('message', { senderId, text });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
