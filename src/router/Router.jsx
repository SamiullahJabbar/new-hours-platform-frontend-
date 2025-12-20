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

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/price" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/account" element={<Account />} />
            <Route path="/perform" element={<Perform />} />
        </Routes>
    )
}

export default Router;