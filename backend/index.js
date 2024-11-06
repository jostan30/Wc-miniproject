// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // Import http to create the server
const socketIO = require('socket.io'); // Import socket.io

// Initialize environment variables
dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIO(server); // Initialize Socket.IO

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To allow cross-origin requests

// Database connection
const connectDB = require('./config/db');
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/chat', chatRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // Handle chat events here
    socket.on('chat message', (msg) => {
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
