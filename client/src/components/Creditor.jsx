import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

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
    <div>
      <h1>Creditors</h1>
      {show && creditors.map((user) => <div>{user.name}</div>)}
    </div>
  );
}
