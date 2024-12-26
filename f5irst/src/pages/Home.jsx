import React from "react";
import home1 from "../../public/images/home1.jpg";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[100vh] text-black bg-white w-full relative flex flex-col items-center justify-start">
      <div className="h-[80%] w-full absolute left-0 top-0">
        <img src={home1} className="h-full w-full" />
      </div>
      <div className="z-10 h-fit w-full flex flex-row items-start p-2 ">
        <h1 className="text-[2.2rem] font-semibold">uber</h1>
      </div>
      <div className="z-10 h-[7rem]  absolute bottom-0 w-full flex flex-col items-center justify-start gap-2">
        <h1 className="text-[1.5rem] font-semibold">Get Started With Uber</h1>
        <Link to={"/userlogin"} className="bg-blue-500 flex flex-row items-center gap-3 justify-center w-[20rem] text-2xl text-white px-4 py-2 rounded-md">
          Get Started
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Home;
