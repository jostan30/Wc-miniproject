import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            toast.success('Login successful! Redirecting to home...', { autoClose: 3000 });
            setTimeout(()=>{
                navigate('/');
            },2000)
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Login failed. Please try again.', {
                autoClose: 5000
            });
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div  className="input-group top30">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button class="b1" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
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

export default Login;
