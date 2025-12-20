import React from 'react';
import horseImg from "../assets/horse.png"
import Logo from "../assets/logo.jpg"

const Login = () => {

    const inputFields = [
        {
            id: 1,
            type: "email",
            placeholder: "Email",
            icon: "bi-envelope",
        },
        {
            id: 2,
            type: "password",
            placeholder: "Password",
            icon: "bi-eye-slash",
        },
    ]

    const floatingIcons = [
        {
            id: 1,
            icon: "bi-lightning-fill",
            position: "top-1/3 left-6",
        },
    ]

    return (
        <div className="flex h-screen w-full overflow-hidden">

            {/* LEFT SECTION */}
            <div className="flex items-center justify-center bg-white w-full md:w-1/2">
                <div className="w-[360px] md:mx-auto">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-3">
                            <i className="bi bi-shield-fill text-white text-2xl" />
                        </div>
                        <p className="text-sm text-gray-600">hipodrom.ai</p>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center mb-2">
                        ADMIN LOGIN
                    </h1>
                    <p className="text-sm text-gray-500 text-center mb-8">
                        How to i get started lorem ipsum dolor at?
                    </p>

                    {/* Inputs */}
                    <div className="space-y-4">
                        {inputFields.map((field) => (
                            <div
                                key={field.id}
                                className="flex items-center bg-gray-100 rounded-full px-4 py-3"
                            >
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="flex-1 bg-transparent outline-none text-sm"
                                />
                                <i className={`bi ${field.icon} text-gray-400`} />
                            </div>
                        ))}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right mt-3">
                        <button className="text-sm text-red-500 hover:underline">
                            Forget password
                        </button>
                    </div>

                    {/* Login Button */}
                    <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition">
                        Login
                    </button>

                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="w-1/2 relative bg-green-600 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15)_0%,transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.15)_0%,transparent_40%)]" />

                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="relative w-[420px] h-[520px] rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl flex items-center justify-center">

                        {/* Title */}
                        <h2 className="absolute top-10 left-10 text-white text-3xl font-bold leading-tight">
                            Admin <br /> Login!!!
                        </h2>

                        {/* Floating Icons */}
                        {floatingIcons.map((item) => (
                            <div
                                key={item.id}
                                className={`absolute ${item.position} w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg`}
                            >
                                <i className={`bi ${item.icon} text-yellow-400 text-xl`} />
                            </div>
                        ))}

                        {/* Image */}
                        <img
                            src={horseImg}
                            alt="Horse Rider"
                            className="w-[280px] object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Login;