import React from 'react';
import Logo from '../assets/logo.jpg'
import Brand from '../assets/brand.jpg'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const menu = [
        {
            icon: 'bi-grid',
            href: '/',
            text: 'Dashboard',
        },
        {
            icon: 'bi-upload',
            href: '/upload-tips',
            text: 'Upload Tips',
        },
        {
            icon: 'bi-upload',
            href: '/upload-result',
            text: 'Upload Result',
        },
        {
            icon: 'bi-file-pdf',
            href: '/manage-result',
            text: 'Manage Result',
        },
        {
            icon: 'bi-file-pdf',
            href: '/manage-tips',
            text: 'Manage Tips',
        },
        {
            icon: 'bi-people',
            href: '/members',
            text: 'Members',
        },
        {
            icon: 'bi-graph-up',
            href: '/performance',
            text: 'Performance',
        },
        {
            icon: 'bi-image',
            href: '/generation',
            text: 'Banner & Content Generation'
        },
        {
            icon: 'bi-box-arrow-right',
            href: '/logout',
            text: 'Log Out'
        },
    ]

    return (
        <div className="side-bar px-3">
            <div className="brand-logo my-2">
                <NavLink to="/">
                    <img src={Logo} width="250" height="40" alt="logo" className="object-cover rounded-md" />
                </NavLink>
            </div>
            <div className="side-navigation my-2">
                <ul className="navigation-list space-y-5">
                    <li>
                        {
                            menu.map((menu, index) => {
                                return (
                                    <NavLink to={menu.href} className={`flex items-center w-full px-2 py-3 transition-colors text-gray-500 hover:text-black font-medium border-2 border-transparent focus:border-green-700 hover:bg-gray-200 ${(e) => { e.isActive ? 'bg-green-700 text-white' : '' }} rounded-md`}>
                                        <i className={`bi text-lg ${menu.icon}`}></i>
                                        <span className='text-sm ml-2'>{menu.text}</span>
                                    </NavLink>
                                )
                            })
                        }
                    </li>
                    <div className="img">
                        <img src={Brand} className='block w-full rounded-md' height={80} alt="logo" />
                    </div>
                    <div className="button flex gap-2 w-full my-2">
                        <button className="btn w-8 h-8 border bg-green-600 rounded-md font-medium text-white transition-colors" type='button'>EN</button>
                        <button className="btn w-8 h-8 border border-green-600 hover:bg-green-600 hover:text-white rounded-md font-medium text-green-600 transition-colors" type='button'>TR</button>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;