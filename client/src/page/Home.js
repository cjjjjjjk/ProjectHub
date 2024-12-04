import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center font-raleway gap-4">
      <h1 className="font-bold text-8xl text-white">WELCOME</h1>
      <p className="w-1/2 text-center text-white">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio ea,
        explicabo dignissimos et voluptatum sequi minus ab quisquam eligendi
        maiores eum, excepturi, numquam distinctio! Quia blanditiis quos dolor
        sit corporis.
      </p>
      <Link
        to="/page/project"
        className="py-2 px-8 bg-white text-blue-500 rounded-2xl font-semibold text-2xl hover:bg-blue-500 hover:text-white"
      >
        GET STARTED
      </Link>
    </div>
  );
}

export default Home;
