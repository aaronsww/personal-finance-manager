import React, { useContext, useEffect, useState } from "react";
import Users from "./Users";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const { user, isAuthenticated } = useContext(AuthContext);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/me/balance", {
          headers: { Authorization: `Bearer: ${user.token}` },
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.error(err); 
      }
    })();
  }, [user.token]);

  return (
    <div>
      <nav className="bg-gray-800 flex justify-between items-center text-white h-24 p-0 m-0 shadow-md">
        <div className="text-4xl text-indigo-500 font-bold ml-16">
          Cash Control
        </div>
        <div className="relative">
          <Link to="/creditor">
            <button className="hover:text-indigo-500 transition rounded-md px-4 py-2 mr-4">
              Credit
            </button>
          </Link>
          <Link to="/debtor">
            <button className=" hover:text-indigo-500   rounded-md px-4 py-2">
              Debt
            </button>
          </Link>
          <Link to="/transaction">
            <button className="hover:text-indigo-500  rounded-md px-4 py-2">
              Notifications
            </button>
          </Link>
          <button
            onClick={togglePopup}
            className="hover:text-indigo-500  rounded-md px-4 py-2 mr-4"
          >
            Profile
          </button>
          {isPopupOpen && (
            <div className="absolute top-8 right-0 w-48 bg-gray-900 border border-gray-600 rounded-lg shadow-lg z-10">
              <Link
                to="/wallet"
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
              >
                Wallet
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                >
                  Log in
                </Link>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => window.location.reload()}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                >
                  Log out
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
      <div className="text-2xl py-10 p-16 flex items-center">
        Your current balance is&nbsp;&nbsp;
        <span className="font-semibold text-4xl">
          {balance.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-wrap">
        <Users />
        {/* <Groups /> */}
      </div>
    </div>
  );
}

export default Home;
