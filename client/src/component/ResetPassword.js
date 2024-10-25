import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navi = useNavigate()
    const [password, setPassword] = useState("");
    const [comfirmpass, setConfirmPassword] = useState("");
    const [isConfirmed, setIsconfirmed] = useState(true)
    const [showPass, setShowPass] = useState(false);

    const handleShowPass = () => {
        if (!showPass)
            setShowPass(true)
        setTimeout(() => {
            setShowPass(false)
        }, 2000);
    };
    const handlePasswordConfirm = (e) => {
        const confirmPass = e.target.value;
        setConfirmPassword(confirmPass);

        if (password && confirmPass !== password) {
            setIsconfirmed(false);
        } else {
            setIsconfirmed(true);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (isConfirmed && password)
            try {
                const path = window.location.pathname
                const token = path.split('/').pop()

                const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/users/reset-password/${token}`, { password })
                alert(res.data.message + "\nBack to login page in 2(s)")
                setTimeout(() => {
                    navi("/Login")
                }, 2000);
                console.warn(res.data.message)
            } catch (e) {
                console.error(e.response?.data?.message)
            }
        else {
            console.warn('Password confirmation not match !')
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md px-8 py-10">
                <h1 className="text-3xl font-bold text-left mb-6">Your new password</h1>
                <form action="">
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                id="password"
                                className="block w-full px-4 py-3 text-lg text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setIsconfirmed(comfirmpass === password)
                                }}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                                onClick={handleShowPass}
                            >
                                {showPass ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Confirm password
                        </label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                id="confirmPassword"
                                onChange={handlePasswordConfirm}
                                className={`block w-full px-4 py-3 text-lg text-gray-900 rounded-md border ${isConfirmed ? "border-green-500" : "border-red-500"} focus:outline-none focus:ring-2 ${isConfirmed ? "focus:ring-green-500" : "focus:ring-red-500"} focus:border-transparent`}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                                onClick={handleShowPass}
                            >
                                {showPass ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>


                    <button
                        className="w-full py-3 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        onClick={handleResetPassword}
                    >
                        Update password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
