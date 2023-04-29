import React, { useState } from "react";

function Registration() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Do something to log the user in
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2 text-left">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={handleUserNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2 text-left">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={userName}
            onChange={handleUserNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2 text-left">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <a href="" className="text-gray-600 mr-2">
            Already have an account?
          </a>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
