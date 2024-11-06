import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust based on your backend URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch rides
export const fetchRides = async () => {
    const response = await api.get('/rides');
    return response.data;
};

// Add more API functions as needed (login, register, post ride, etc.)
