import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.jpg'
import Button from './ui/Button';

const Header = () => {
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
                            <NavLink to="/login">
                                <Button variant="yellow" size="sm">Login</Button>
                            </NavLink>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Header;
