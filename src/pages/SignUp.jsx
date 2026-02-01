import React, { useRef, useState } from 'react';
import Button from '../components/ui/Button';
import SignupBg from '../assets/signup-bg.jpg';
import SignupImg from '../assets/signup.jpg';
import Glow from '../assets/glow.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SignUp = () => {
  const inputRef = useRef();
  const toggleRef = useRef();
  const navigate = useNavigate();
  const { register } = useAuth(); // isAuthenticated yahan se remove kar diya taaki registration ke baad login pe ja sake

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const showPassword = () => {
    if (inputRef.current.type === 'password') {
      inputRef.current.type = 'text';
      toggleRef.current.classList.remove('bi-eye-slash');
      toggleRef.current.classList.add('bi-eye');
    } else {
      inputRef.current.type = 'password';
      toggleRef.current.classList.add('bi-eye-slash');
      toggleRef.current.classList.remove('bi-eye');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.username, formData.email, formData.password, formData.confirmPassword);

      if (result.success) {
        setSuccess(
          'Registration successful! Redirecting to login page...'
        );
        // 1.5 second wait karega phir login page pe bhej dega
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signup min-h-screen flex justify-center items-center px-5 md:px-0"
      id="signup"
    >
      <div className="signup-bg container md:max-w-[70%] min-h-[65.87vh] overflow-hidden md:mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex items-center">
          <div className="signup-left md:w-1/2 w-full p-3">
            <div className="signup-title text-center mb-3">
              <h3 className="text-2xl font-semibold mb-1">Sign Up Here!</h3>
              <p className="text-lg font-medium text-gray-400">
                Join Horse Racing Tips Today
              </p>
            </div>

            {error && (
              <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-3">
                {success}
              </div>
            )}

            <div className="signup-form my-3">
              <form onSubmit={handleSubmit} method="post">
                <div className="form-group flex items-center border-2 border-gray-300 px-2 py-2 rounded-md mb-2">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full px-3 outline-none placeholder:text-gray-400"
                    id="username"
                    placeholder="Your Username"
                    required
                  />
                  <i className="bi text-gray-400 pr-3 bi-person-fill"></i>
                </div>

                <div className="form-group flex items-center border-2 border-gray-300 px-2 py-2 rounded-md mb-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-3 outline-none placeholder:text-gray-400"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                  <i className="bi text-gray-400 pr-3 bi-envelope-fill"></i>
                </div>

                <div className="form-group flex items-center border-2 border-gray-300 px-2 py-2 rounded-md mb-2">
                  <input
                    type="password"
                    ref={inputRef}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 outline-none placeholder:text-gray-400"
                    id="password"
                    placeholder="Your Password"
                    required
                  />
                  <i
                    ref={toggleRef}
                    onClick={showPassword}
                    className="bi text-gray-400 pr-3 cursor-pointer bi-eye-slash"
                  ></i>
                </div>

                <div className="form-group flex items-center border-2 border-gray-300 px-2 py-2 rounded-md mb-2">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-3 outline-none placeholder:text-gray-400"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    required
                  />
                  <i className="bi text-gray-400 pr-3 cursor-pointer bi-eye-slash"></i>
                </div>

                <div className="form-button grid md:flex md:justify-center mt-3">
                  <Button
                    variant="yellow"
                    type="submit"
                    size="lg"
                    className="px-6 font-bold"
                    disabled={loading}
                  >
                    {loading ? 'Signing up...' : 'Sign Up'}
                  </Button>
                </div>

                <div className="no-exist-account text-center mt-3">
                  <p className="font-medium">
                    If you have already Account{' '}
                    <NavLink
                      className="text-lg font-medium text-gray-500"
                      to="/login"
                    >
                      Login Now
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div
            className="signup-right hidden md:flex items-center justify-center md:w-1/2 w-full h-[450px] bg-no-repeat bg-center bg-cover relative"
            style={{ backgroundImage: `url(${SignupBg})` }}
          >
            <div className="h-52 w-52 relative border-2 border-white bg-white bg-opacity-15 text-white text-center p-4">
              <img
                src={SignupImg}
                className="block absolute -bottom-5"
                width={800}
                alt="signup"
              />
            </div>

            <img
              src={Glow}
              width={70}
              height={70}
              className="absolute rounded-full left-0 ml-3"
              alt="signup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;