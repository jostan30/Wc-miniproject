import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Chat.css';

const Chat = ({ rideId, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Fetch messages when the chat is opened (mock implementation)
    useEffect(() => {
        // Replace this with actual API call to fetch messages
        const fetchMessages = async () => {
            // Mock data for example
            const fetchedMessages = [
                { sender: 'User1', content: 'Hello, is this ride still available?' },
                { sender: 'User2', content: 'Yes, it is!' }
            ];
            setMessages(fetchedMessages);
        };
        fetchMessages();
    }, [rideId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (newMessage.trim() === '') {
            toast.error('Message cannot be empty');
            return;
        }

        // Send the new message to the server (mock implementation)
        const messageToSend = {
            rideId,
            content: newMessage,
            sender: 'User1' // replace with the actual user identifier
        };

        // Simulating sending a message
        setMessages((prevMessages) => [...prevMessages, messageToSend]);
        setNewMessage('');

        // You would typically send this to your server
        // await sendMessageToServer(messageToSend);
    };

    return (
        <div className="chat-container">
            <h3>Chat</h3>
            <button onClick={onClose}>Close Chat</button>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'User1' ? 'sent' : 'received'}>
                        <strong>{msg.sender}: </strong>{msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
