import React, { useContext, useEffect, useState } from "react";
import walletImg from "../images/wallet.png";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function Wallet() {
  const [savings, setSavings] = useState(0);
  const [show, setShow] = useState();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleSavingsChange = (event) => {
    setSavings(event.target.value);
    setShow(true);
  };

  useEffect(() => {
    (async () => {
      console.log(user.token);
      const response = await axios.get("http://localhost:5000/me/balance", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSavings(response.data.balance);
    })();
  }, []);

  const handleSave = async (savings) => {
    const response = await axios.patch(
      "http://localhost:5000/me/balance",
      { balance: savings },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if (response.status === 200) navigate("/");
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
          {show && <div onClick={() => handleSave(savings)}>Save</div>}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
