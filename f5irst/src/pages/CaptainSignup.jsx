import React, { useState } from "react";
import { Link } from "react-router-dom";
const CaptainSignup = () => {
  const [loningdatacaptain, setloningdatacaptain] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleInputChange = (e) => {
    setloningdatacaptain({
      ...loningdatacaptain,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(loningdatacaptain);
    setloningdatacaptain({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 h-[100vh]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Uber Captain
            </h1>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to Uber Captain
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
                <div className="flex flex-row h-fit w-ful gap-2">
                  <div className="h-fit w-1/2">
                    <label
                      for="FirstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First name
                    </label>
                    <input
                      required
                      value={loningdatacaptain.firstname}
                      type="text"
                      name="firstname"
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      id="firstname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="firstname"
                    />
                  </div>
                  <div className="h-fit w-1/2">
                    <label
                      for="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      required
                      value={loningdatacaptain.lastname}
                      type="text"
                      name="lastname"
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      id="lastname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Lastname"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    required
                    value={loningdatacaptain.email}
                    type="email"
                    name="email"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    value={loningdatacaptain.password}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Signup Account
                </button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Already have an account?{" "}
                  <Link
                    to={"/CaptainLogin"}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login account
                  </Link>
                  <Link to={"/usersignin"}>
                    <button
                      type="submit"
                      className="w-full px-5 py-3 mt-4 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Sign in as User
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaptainSignup;
