import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-[100vh]  text-white bg-violet-300 flex justify-center items-center">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">
          Login
        </h1>
        <form action="">
          <div className="relative my-8 p-2 pt-4 border-2 border-black rounded-lg">
            <input
              type="email"
              className="block w-72 py-2.3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
            ></input>
            <label
              htmlFor=""
              className="absolute text-lg text-white duration-300 transform -translate-y-5 scale-75 top-4  -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
            >
              Email
            </label>
          </div>
          <div className="relative my-8 p-2 pt-4 border-2 border-black rounded-lg">
            <input
              type="password"
              className="block w-72 py-2.3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
            ></input>
            <label
              htmlFor=""
              className="absolute text-lg text-white duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 "
            >
              Password
            </label>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex">
              <input type="checkbox" name="" id=""></input>
              <label htmlFor="">Remember Me</label>
            </div>
            <Link to="" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mb-4 py-2 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white "
          >
            Login
          </button>
        </form>
        <div className="flex justify-center">
          <span>
            New Here?
            <Link className="text-blue-500 px-2" to="/Register">
              Create an Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
