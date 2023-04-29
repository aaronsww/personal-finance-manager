import React, { useState } from "react";
import Users from "./Users";
import { Link } from "react-router-dom";

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <nav className="flex justify-between items-center bg-white h-16 p-0 m-0 shadow-md">
        <div className="text-xl font-bold">Logo</div>

        <div className="relative">
          <button class=" text-black font-serif rounded-md px-4 py-2 mr-4">
            Credit
          </button>
          <button class="text-black font-serif rounded-md px-4 py-2">
            Debit
          </button>
          <button
            onClick={togglePopup}
            className="text-black font-serif rounded-md px-4 py-2 mr-4">
            Profile
          </button>
          {isPopupOpen && (
            <div className="absolute top-8 right-0 w-48 bg-white border rounded-lg shadow-lg z-10">
              <Link
                to="/wallet"
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                Wallet
              </Link>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>
      <Users />
    </div>
  );
}

export default Home;
