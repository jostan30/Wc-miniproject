import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Chat from './Chat'; // Import your Chat component
import './RideCard.css';

const RideCard = ({ ride }) => {
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleViewDetails = () => {
        // Show a notification when the button is clicked
        toast.info(`Viewing details for ride from ${ride.source} to ${ride.destination}`);
        // Navigate to the ride details page with the ride ID
        navigate(`/rides/${ride._id}`);
        // Open chat
        setIsChatOpen(true);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    return (
        <div className="ride-card">
            <h3>{ride.source} to {ride.destination}</h3>
            <p>Timing: {new Date(ride.timing).toLocaleString()}</p>
            <p>Description: {ride.description}</p>
            <button className="view-button" onClick={handleViewDetails}>View Details</button>
            {isChatOpen && <Chat rideId={ride._id} onClose={handleCloseChat} />}
        </div>
    );
};

export default RideCard;
