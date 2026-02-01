import React, { useRef, useState } from 'react';
import Button from '../components/ui/Button';
import LoginBg from '../assets/login-bg.jpg'
import LoginImg from '../assets/login.jpg'
import Glow from '../assets/glow.jpg'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {

    const inputRef = useRef();
    const toggleRef = useRef();
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/tips');
        }
    }, [isAuthenticated, navigate]);

    const showPassword = () => {
        if (inputRef.current.type === "password") {
            inputRef.current.type = "text";
            toggleRef.current.classList.remove("bi-eye-slash");
            toggleRef.current.classList.add("bi-eye");
        }

        else {
            inputRef.current.type = "password";
            toggleRef.current.classList.add("bi-eye-slash");
            toggleRef.current.classList.remove("bi-eye");
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                navigate('/tips');
            } else {
                setError(result.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login min-h-screen flex justify-center items-center px-5 md:px-0' id='login'>
            <div className="login-bg container md:max-w-[70%] min-h-[65.87vh] overflow-hidden md:mx-auto bg-white shadow-lg rounded-lg">
                <div className="flex items-center">

                    <div className="login-left md:w-1/2 w-full p-3">

                        <div className="login-title text-center mb-3">
                            <h3 className='text-2xl font-semibold mb-1'>Login Here!</h3>
                            <p className='text-lg font-medium text-gray-400'>Welcome back to Horse Racing Tips</p>
                        </div>

                        {error && (
                            <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
                                {error}
                            </div>
                        )}

                        <div className="login-form my-3">
                            <form onSubmit={handleSubmit} method="post">

                                <div className="form-group flex items-center border-2 border-gray-300 px-3 py-2 rounded-md mb-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className='block w-full px-3 outline-none placeholder:text-gray-400'
                                        id="email"
                                        placeholder='Enter Your Email'
                                        required
                                    />
                                    <i className="bi text-gray-400 bi-envelope-fill"></i>
                                </div>

                                <div className="form-group flex items-center border-2 border-gray-300 px-3 py-2 rounded-md mb-2">
                                    <input
                                        type="password"
                                        ref={inputRef}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='block w-full px-3 outline-none placeholder:text-gray-400'
                                        id="password"
                                        placeholder='Enter Your Password'
                                        required
                                    />
                                    <i className="bi text-gray-400 cursor-pointer bi-eye-slash" onClick={showPassword} ref={toggleRef}></i>
                                </div>

                                <div className="forgot-link text-center md:text-end my-2">
                                    <NavLink to="/forgot" className='text-lg font-medium text-gray-500'>Forgot Password <i className="bi bi-question"></i></NavLink>
                                </div>

                                <div className="form-button grid md:flex md:justify-center my-3">
                                    <Button
                                        variant="yellow"
                                        type="submit"
                                        size="lg"
                                        className="px-6 font-bold"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
                                </div>

                                <div className="no-exist-account text-center mt-3">
                                    <p className='font-medium'>If you Don't have Account <NavLink className='text-lg font-medium text-gray-500' to="/signup">Create Account</NavLink></p>
                                </div>

                            </form>
                        </div>

                    </div>

                    <div className="login-right hidden md:flex items-center justify-center md:w-1/2 w-full h-[450px] bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: `url(${LoginBg})` }}>

                        <div className="h-52 w-52 relative border-2 border-white bg-white bg-opacity-15 text-white text-center p-4">
                            <img src={LoginImg} className='block absolute -bottom-5' width={800} alt="login" />
                        </div>

                        <img src={Glow} width={70} height={70} className='absolute rounded-full left-0 ml-3' alt="login" />

                    </div>

                </div>
            </div >
        </div >
    )
}

export default Login;