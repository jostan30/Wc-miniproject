import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostRide from './pages/PostRide';
import Navbar from './components/Navbar';
import "./App.css";

const App = () => {
    return (
        <Router>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post-ride" element={<PostRide />} />
            </Routes>
        </Router>
    );
};

export default App;
