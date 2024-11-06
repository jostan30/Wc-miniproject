import React, { useState, useEffect } from 'react';
import socket from '../socket'; // Import socket instance
import * as jwtDecode from 'jwt-decode'; // Correct import

const Chat = ({ rideId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userId, setUserId] = useState(null); // State to store user ID

    // Get user ID from token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id); // Assuming your token has the user id in the 'id' field
            } catch (error) {
                console.error("Error decoding token", error);
            }
        }
    }, []);

    // Fetch existing messages for the chat room when component mounts
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/chats/${rideId}`);
                const data = await response.json();
                setMessages(data); // Set initial messages
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };

        fetchMessages();
        
        if (rideId && userId) {
            socket.emit('joinRoom', { rideId });
        }

        socket.on('message', (message) => {
            // Update state with the new message
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message'); // Clean up when component unmounts
        };
    }, [rideId, userId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                rideId,
                senderId: userId, // Use the decoded user ID
                text: newMessage,
            };

            // Emit the message to the backend to be broadcast
            socket.emit('chatMessage', message);
            setNewMessage(''); // Clear the input after sending
        }
    };

    if (!userId) {
        return <div>Loading...</div>; // Show loading until user ID is retrieved
    }

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg.senderId}: {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
