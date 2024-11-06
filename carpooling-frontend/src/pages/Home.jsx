import React, { useEffect, useState } from 'react';
import { fetchRides } from '../services/api';
import RideCard from '../components/RideCard';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRides = async () => {
            setLoading(true);
            const data = await fetchRides();
            setRides(data);
            setLoading(false);
        };

        loadRides();
    }, []);

    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero-section">

            </section>

            {/* Intro Section */}
            <section className="intro-section">
                <h2>About Our Carpooling Service</h2>
                <p>
                    Our platform connects you with people traveling the same way, helping you
                    save on travel costs, reduce carbon emissions, and enjoy company on the road.
                </p>
                <div className="feature-cards">
                    <div className="feature-card">
                        <img src="/1.png" alt="Save Money" />
                        <i className="fas fa-money-bill-wave"></i>
                        <h3>Save Money</h3>
                        <p>Split travel costs with others and save on fuel expenses.</p>
                    </div>
                    <div className="feature-card">
                        <img src="/3.png" alt="Eco-Friendly" />
                        <i className="fas fa-leaf"></i>
                        <h3>Eco-Friendly</h3>
                        <p>Reduce your carbon footprint by sharing rides with others.</p>
                    </div>
                    <div className="feature-card">
                        <img src="/4.jpg" alt="Make Connections" />
                        <i className="fas fa-users"></i>
                        <h3>Make Connections</h3>
                        <p>Meet new people and make lasting connections on your journeys.</p>
                    </div>

                    <div className="feature-card">
                    <img src="/2.png" alt="Make Connections" />
                        <i className="fas fa-shield-alt"></i>
                        <h3>Safe and Secure</h3>
                        <p>Verified profiles and reviews for a secure carpooling experience.</p>
                    </div>
                </div>
            </section>

            {/* Available Rides Section */}
            <section className="available-rides">
                <h2>Available Rides</h2>
                {loading ? (
                    <p className="loading-text">Loading rides...</p>
                ) : rides.length > 0 ? (
                    <ul className="ride-list">
                        {rides.map(ride => (
                            <li key={ride._id}>
                                <RideCard ride={ride} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-rides">No rides found. Please check back later.</p>
                )}
            </section>

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default Home;
