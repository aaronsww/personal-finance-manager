import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import ProfileImg from "../images/profile.jpg";

export default function () {
  const { user } = useContext(AuthContext);

  const [creditors, setCreditors] = useState([]);
  const [show, setShow] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log(user.token);
      const response = await axios.get("http://localhost:5000/me/creditors", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCreditors(response.data);
      console.log(response);
      setShow(true);
    })();
  }, []);

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
          </div>
        ))}
      </div>
      ;
    </div>
  );
}
