import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import Brand from '../assets/horse.jpg';
import { userAPI, authAPI } from '../api/client';

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* MOBILE HEADER - FIXED POSITION */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-white border-b shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          {/* LEFT: LOGO */}
          <div className="flex items-center">
            <NavLink to="/" onClick={closeMenu}>
              <img 
                src={Logo} 
                alt="Logo" 
                className="h-10 w-auto object-contain"
              />
            </NavLink>
          </div>

          {/* RIGHT: MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[90] lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl z-[95] 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{ marginTop: '64px' }}>
        
        <div className="h-full overflow-y-auto p-4">
          {/* DESKTOP LOGO */}
          <div className="hidden lg:block mb-8">
            <NavLink to="/">
              <img 
                src={Logo} 
                alt="Logo" 
                className="w-full h-14 object-cover rounded-md"
              />
            </NavLink>
          </div>

          {/* USER PROFILE */}
          {!loading && user && (
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                  {getInitials(user.email)}
                </div>
                <div>
                  <p className="text-sm font-medium truncate">{user.email}</p>
                  <p className="text-xs text-gray-500">
                    {user.role === 'admin' ? 'Administrator' : 'Member'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/tips"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Today Tips</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/perform"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Performance</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/archive"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span>Archive</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/account"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Account</span>
                </NavLink>
              </li>
            </ul>

            {/* BRAND BANNER - DESKTOP ONLY */}
            <div className="hidden lg:block mt-8">
              <img 
                src={Brand} 
                alt="Brand" 
                className="w-full h-48 object-cover rounded-md"
              />
            </div>

            {/* LOGOUT BUTTON */}
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Log Out</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* SPACER FOR MOBILE HEADER */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};

export default Sidebar;