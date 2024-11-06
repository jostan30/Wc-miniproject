import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import L from 'leaflet';
import axios from 'axios';
import './RideCard.css';

const RideCard = ({ ride }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sourceCoords, setSourceCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);

    const apiKey = "1e12854c5f0d29d715757fab80241297"; // Replace with your PositionStack API Key

    // Function to get latitude and longitude from the provided address using PositionStack
    const getCoordinates = async (address) => {
        try {
            const response = await axios.get('http://api.positionstack.com/v1/forward', {
                params: {
                    access_key: apiKey,
                    query: address,
                },
            });

            // Check if the API response is valid
            if (response.data.data && response.data.data.length > 0) {
                const { latitude, longitude } = response.data.data[0];
                return { lat: latitude, lng: longitude };
            } else {
                throw new Error('No coordinates found for this address');
            }
        } catch (error) {
            console.error("Error fetching geocoding data:", error.response ? error.response.data : error.message);
            toast.error("Failed to fetch location coordinates.");
            return null;
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            const fetchCoordinates = async () => {
                const sourceCoords = await getCoordinates(ride.source);
                const destinationCoords = await getCoordinates(ride.destination);

                if (sourceCoords) {
                    setSourceCoords(sourceCoords);
                }

                if (destinationCoords) {
                    setDestinationCoords(destinationCoords);
                } else {
                    toast.error("Could not fetch coordinates for source or destination.");
                }
            };

            fetchCoordinates();
        }
    }, [isModalOpen, ride.source, ride.destination]);

    const handleViewDetails = () => {
        toast.info(`Viewing details for ride from ${ride.source} to ${ride.destination}`);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="ride-card">
            <h3>{ride.source} to {ride.destination}</h3>
            <p>Timing: {new Date(ride.timing).toLocaleString()}</p>
            <p>Description: {ride.description}</p>
            <button onClick={handleViewDetails}>View Details</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Ride Details</h3>
                        <p><strong>Source:</strong> {ride.source}</p>
                        <p><strong>Destination:</strong> {ride.destination}</p>
                        <p><strong>Timing:</strong> {new Date(ride.timing).toLocaleString()}</p>
                        <p><strong>Description:</strong> {ride.description}</p>
                        <p><strong>Created at:</strong> {new Date(ride.createdAt).toLocaleString()}</p>

                        {sourceCoords ? (
                            <div className="map-container">
                                <Map sourceCoords={sourceCoords} destinationCoords={destinationCoords} />
                            </div>
                        ) : (
                            <p>Loading map...</p>
                        )}

                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Map = ({ sourceCoords, destinationCoords }) => {
    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        // Initialize the map centered on sourceCoords and set a zoom level of 14
        const map = L.map(mapContainer).setView([sourceCoords.lat, sourceCoords.lng], 14);

        // Use OpenStreetMap tile layer for the map (no external API key required)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(map);

        // Add a marker for the source location
        const sourceMarker = L.marker([sourceCoords.lat, sourceCoords.lng]).addTo(map).bindPopup('Source');

        // If destination coordinates are available, add a destination marker
        if (destinationCoords) {
            const destMarker = L.marker([destinationCoords.lat, destinationCoords.lng])
                .addTo(map)
                .bindPopup('Destination');
        }

        // Cleanup function to remove map instance when component is unmounted
        return () => {
            map.remove();
        };
    }, [sourceCoords, destinationCoords]);

    return (
        <div id="map" className="leaflet-container" style={{ height: '250px', width: '100%' }}></div>
    );
};

export default RideCard;
