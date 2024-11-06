import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure you have this CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-item">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar-item">
                <Link to="/login">Login</Link>
            </div>
            <div className="navbar-item">
                <Link to="/register">Register</Link>
            </div>
            <div className="navbar-item">
                <Link to="/post-ride">Post Ride</Link>
            </div>
        </nav>
    );
};

export default Navbar;
