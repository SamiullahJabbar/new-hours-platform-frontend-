import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jpg'
import Button from './ui/Button';
import { authAPI } from '../api/client';
import { TokenManager } from '../baseUrls/api';

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if user is authenticated
        const token = TokenManager.getAccessToken();
        const user = localStorage.getItem('user');

        if (token && user) {
            setIsAuthenticated(true);
            // Get username from token
            const usernameFromToken = TokenManager.getUsernameFromToken();
            setUsername(usernameFromToken || 'User');
        }
    }, []);

    const handleLogout = async () => {
        try {
            await authAPI.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            TokenManager.removeTokens();
            setIsAuthenticated(false);
            setUsername('');
            navigate('/login');
        }
    };

    return (
        <nav className='navbar md:absolute top-0 w-full md:w-3/4 mx-auto bg-white text-black md:rounded-md py-2 px-3 md:my-2 shadow-md'>
            <div className="container mx-auto">
                <div className="flex flex-col justify-center md:flex-row md:justify-between items-center">

                    <div className="menu-left w-full md:w-1/2 flex justify-between md:justify-start items-center mb-2 md:mb-0">
                        <div className="brand-logo">
                            <NavLink to="/">
                                <img src={Logo} width={150} height={50} alt="logo" className="block object-cover rounded-md" />
                            </NavLink>
                        </div>
                        <div className="menu-item mx-0 md:mx-auto">
                            <ul className="menu-list flex gap-x-3">
                                <li className="menu-item">
                                    <NavLink to="/" className={({ isActive }) => `inline-block font-medium transition-colors hover:text-orange-700 ${isActive ? 'text-green-700' : ''}`}>Home</NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to="/price" className={({ isActive }) => `inline-block font-medium transition-colors hover:text-orange-700 ${isActive ? 'text-green-700' : ''}`}>Pricing</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="menu-right my-2">
                        <div className="right-button flex justify-center md:justify-end gap-1">
                            <Button variant="default" size="sm">
                                <i className="bi bi-globe"></i>
                                <span className='ml-2'>ENG</span>
                            </Button>

                            {isAuthenticated ? (
                                <>
                                    <NavLink to="/tips">
                                        <Button variant="default" size="sm">
                                            <i className="bi bi-speedometer2"></i>
                                            <span className='ml-2'>Dashboard</span>
                                        </Button>
                                    </NavLink>
                                    <button onClick={handleLogout}>
                                        <Button variant="yellow" size="sm">
                                            <i className="bi bi-box-arrow-right"></i>
                                            <span className='ml-2'>Logout</span>
                                        </Button>
                                    </button>
                                </>
                            ) : (
                                <NavLink to="/login">
                                    <Button variant="yellow" size="sm">Login</Button>
                                </NavLink>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Header;
