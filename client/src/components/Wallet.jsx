import React, { useEffect, useState } from "react";
import walletImg from "./wallet.png";
import axios from "axios";

function Wallet() {
  const [savings, setSavings] = useState(0);
  const [show, setShow] = useState();

  const handleSavingsChange = (event) => {
    setSavings(event.target.value);
    setShow(true);
  };

  const handleClick = () => {
    useEffect(() => {
      axios.post(
        "http://localhost:5000/me",
        {},
        { headers: { Authorization: "Bearer " } }
      );
    }, []);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">My Wallet</h1>
        <img src={walletImg} alt="wallet" className="ml-12 h-40 w-40 mb-4" />

        <div className="flex items-center border-b-2 border-gray-400 py-2 mb-4">
          <label className="mr-4 font-bold">Current Savings:</label>
          <input
            type="text"
            value={savings}
            onChange={handleSavingsChange}
            className="border border-gray-400 py-2 px-4 rounded-lg w-32"
          />
        </div>
      </div>
    </div>
  );
}

export default Wallet;
