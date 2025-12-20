import React, { useRef } from 'react';
import Button from '../components/ui/Button';
import SignupBg from '../assets/signup-bg.jpg'
import SignupImg from '../assets/signup.jpg'
import Glow from '../assets/glow.jpg'
import { NavLink } from 'react-router-dom';

const SignUp = () => {

    const inputRef = useRef();
    const toggleRef = useRef();

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

    return (
        <div className='signup min-h-screen flex justify-center items-center px-5 md:px-0' id='signup'>
            <div className="signup-bg container md:max-w-[70%] min-h-[65.87vh] overflow-hidden md:mx-auto bg-white shadow-lg rounded-lg">
                <div className="flex items-center">

                    <div className="signup-left md:w-1/2 w-full p-3">

                        <div className="signup-title text-center mb-3">
                            <h3 className='text-2xl font-semibold mb-1'>Sign Up Here!</h3>
                            <p className='text-lg font-medium text-gray-400'>How I get Started Lorem, ipsum dolor.</p>
                        </div>

                        <div className="signup-form my-3">
                            <form action="" method="post">

                                <div className="form-group flex items-center border-2 border-gray-300 px-2 py-2 rounded-md mb-2">
                                    <input type="email" name="email" className='block w-full px-3 outline-none placeholder:text-gray-400' id="email" placeholder='Your Email' required />
                                    <i className="bi text-gray-400 pr-3 bi-envelope-fill"></i>
                                </div>

                                <div className="form-group flex items-center border-2 border-gray-300 px-2 py-2 rounded-md mb-2">
                                    <input type="password" ref={inputRef} name="password" className='block w-full px-3 outline-none placeholder:text-gray-400' id="password" placeholder='Your Password' required />
                                    <i ref={toggleRef} onClick={showPassword} className="bi text-gray-400 pr-3 cursor-pointer bi-eye-slash"></i>
                                </div>

                                <div className="form-group flex items-center border-2 border-gray-300 px-2 py-2 rounded-md mb-2">
                                    <input type="password" name="confirm-password" className='block w-full px-3 outline-none placeholder:text-gray-400' id="confirm-password" placeholder='Confirm Password' required />
                                    <i className="bi text-gray-400 pr-3 cursor-pointer bi-eye-slash"></i>
                                </div>

                                <div className="form-button grid md:flex md:justify-center mt-3">
                                    <Button variant="yellow" type="submit" size="lg" className="px-6 font-bold">Sign Up</Button>
                                </div>

                                <div className="no-exist-account text-center mt-3">
                                    <p className='font-medium'>If you have already Account <NavLink className='text-lg font-medium text-gray-500' to="/login">Login Now</NavLink></p>
                                </div>

                            </form>
                        </div>

                    </div>

                    <div className="signup-right hidden md:flex items-center justify-center md:w-1/2 w-full h-[450px] bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: `url(${SignupBg})` }}>

                        <div className="h-52 w-52 relative border-2 border-white bg-white bg-opacity-15 text-white text-center p-4">
                            <img src={SignupImg} className='block absolute -bottom-5' width={800} alt="signup" />
                        </div>

                        <img src={Glow} width={70} height={70} className='absolute rounded-full left-0 ml-3' alt="signup" />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp;