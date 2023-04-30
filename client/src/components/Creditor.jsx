import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import ProfileImg from "../images/profile.jpg";

export default function Creditor() {
  const { user } = useContext(AuthContext);

  const [creditors, setCreditors] = useState([]);
  const [show, setShow] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log(user.token);
      const response = await axios.get(
        "http://localhost:5000/me/counter-parties",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setCreditors(response.data);
      console.log(response);
      setShow(true);
    })();
  }, [user.token]);

  const payup = async (settleUser) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/pay",
        { payeeId: settleUser.userId, amount: Math.abs(settleUser.amount) },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      navigate("/transaction");
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message || err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl mt-10 mb-5 font-bold">Creditors: </div>
      <div className="flex flex-wrap">
        {creditors.map((user) => (
          <div className="m-4">
            <img src={ProfileImg} className="h-40 w-40"></img>
            <div className="text-lg font-medium">
              Name : <span className="font-bold">{user.name}</span>
            </div>
            <div className="text-lg font-medium">
              Amount : <span className="font-bold">{user.amount}</span>
            </div>
            <button className="bg-green-500 hover:bg-green-400 text-white font-semibold  rounded-md px-4 py-2 mr-4" onClick={() => payup(user)}>Pay</button>
          </div>
        ))}
      </div>
      ;
    </div>
  );
}
