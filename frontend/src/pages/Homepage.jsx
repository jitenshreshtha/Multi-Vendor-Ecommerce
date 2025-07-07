import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div>
            <h3>This is my homepage</h3>
            {!isLoggedIn && <Link to='/register'>Register</Link>}
            {isLoggedIn ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <Link to='/vendor/register'>Become Vendor</Link>
                    <Link to='/vendor/dashboard'>Vendor Dashboard</Link>
                </>
            ) : (
                <Link to='/login'>Login</Link>
            )}
        </div>
    );
}