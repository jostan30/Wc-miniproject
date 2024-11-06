import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios'; 
import './PostRide.css'; // Import the CSS file for styling

const PostRide = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidTimeFormat = (time) => {
        // Regular expression to validate time in YYYY-MM-DD HH:MM format
        const timeFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
        return timeFormat.test(time);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if the time format is valid
        if (!isValidTimeFormat(time)) {
            toast.error('Please enter a valid time format (YYYY-MM-DD HH:MM)');
            return;
        }

        setLoading(true);
        try {
            // Prepare ride data
            const rideData = {
                source,
                destination,
                timing: time, // Ensure this matches what your backend expects
                description
            };

            // Retrieve the token from local storage
            const token = localStorage.getItem('token'); // Assuming token is stored as 'token'

            // Send POST request to the backend API with token authorization
            const response = await axios.post('http://localhost:5000/api/rides', rideData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to headers
                }
            });

            if (response.status === 201) {
                toast.success('Ride posted successfully!',{
                    autoClose:5000
                });
                // Clear form fields after successful submission
                setSource('');
                setDestination('');
                setTime('');
                setDescription('');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Failed to post ride. Please try again.';
            toast.error(errorMsg,{
                autoClose: 5000
            });
            console.error('Error posting ride:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-ride-container">
            <h1>Post a Ride</h1>
            <form onSubmit={handleSubmit} className="post-ride-form">
                <div className="input-group top30">
                    <label htmlFor="source">Source</label>
                    <input 
                        type="text" 
                        id="source"
                        placeholder="Source" 
                        value={source} 
                        onChange={(e) => setSource(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="destination">Destination</label>
                    <input 
                        type="text" 
                        id="destination"
                        placeholder="Destination" 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="time">Time (YYYY-MM-DD HH:MM)</label>
                    <input 
                        type="text" 
                        id="time"
                        placeholder="Time" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description"
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    ></textarea>
                </div>
                <button className='b1'  type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Ride'}
                </button>
            </form>
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                closeOnClick 
                pauseOnHover 
            />
        </div>
        
    );
};

export default PostRide;
