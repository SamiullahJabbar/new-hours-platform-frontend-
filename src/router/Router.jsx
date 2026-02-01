import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Pricing from '../pages/Pricing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Tips from '../pages/Tips';
import Archive from '../pages/Archive';
import Account from '../pages/Account';
import Perform from '../pages/Perform';
import { ProtectedRoute } from '../contexts/AuthContext';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/price" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tips" element={<ProtectedRoute><Tips /></ProtectedRoute>} />
            <Route path="/archive" element={<ProtectedRoute><Archive /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/perform" element={<ProtectedRoute><Perform /></ProtectedRoute>} />
        </Routes>
    )
}
export default Router;