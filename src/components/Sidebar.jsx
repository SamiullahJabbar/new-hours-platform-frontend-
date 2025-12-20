import React from 'react';
import Logo from '../assets/logo.jpg';
import Brand from '../assets/horse.jpg';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className='side-bar w-full'>

      <div className="brand-logo mb-3">
        <NavLink to='/'>
          <img src={Logo} className='block w-full h-14 object-cover rounded-md' alt="logo" />
        </NavLink>
      </div>

      <div className="side-navigation">
        <ul className="navigation-list space-y-4">

          <li className="nav-item">
            <NavLink to='/tips' className='flex items-center py-2 px-4 w-full rounded text-gray-500 hover:bg-slate-200 hover:text-black'>
              <i className="bi bi-calendar"></i>
              <span className='font-medium ml-2'>Today Tips</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to='/perform' className='flex items-center py-2 px-4 w-full rounded text-gray-500 hover:bg-slate-200 hover:text-black'>
              <i className="bi bi-arrow-90deg-up"></i>
              <span className='font-medium ml-2'>Performance</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to='/archive' className='flex items-center py-2 px-4 w-full rounded text-gray-500 hover:bg-slate-200 hover:text-black'>
              <i className="bi bi-archive"></i>
              <span className='font-medium ml-2'>Archive</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to='/account' className='flex items-center py-2 px-4 w-full rounded text-gray-500 hover:bg-slate-200 hover:text-black'>
              <i className="bi bi-person"></i>
              <span className='font-medium ml-2'>Account</span>
            </NavLink>
          </li>

          <div className="brand-logo my-3">
            <NavLink to='/'>
              <img src={Brand} className='block w-full h-44 object-cover rounded-md' alt="logo" />
            </NavLink>
          </div>

          <li className="nav-item">
            <button type='button' className='flex items-center py-2 px-4 rounded w-full text-gray-500 hover:bg-slate-200 hover:text-black'>
              <i className="bi bi-box-arrow-right"></i>
              <span className='font-medium ml-2'>Log Out</span>
            </button>
          </li>

        </ul>
      </div>

    </aside>
  )
}

export default Sidebar;