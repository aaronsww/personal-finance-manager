import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../images/profile.jpg";

export default function Debtor() {
  const [searchUser, setSearchUser] = useState("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  const [show, setShow] = useState();
  const [debtor, setDebtor] = useState({});
  const [debtors, setDebtors] = useState([]);
  const perfromSearch = (user) => {
    axios
      .get(`http://localhost:5000/user/search?name=${searchUser}`)
      .then((res) => {
        console.log(res.data);
        setDebtor({ id: res.data[0]._id, name: res.data[0].name });
        setShow(true);
      });
  };

  const handleClick = async (amount) => {
    const response = await axios.post(
      "http://localhost:5000/me/counter-parties/add",
      { counterPartyId: debtor.id, amount: +amount },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      console.log(user.token);
      const response = await axios.get(
        "http://localhost:5000/me/counter-parties",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log(response.data);
      setDebtors(response.data);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-2xl font-bold">Add Debtor</h1>
      <div className="shadow-md p-12 rounded flex flex-col justify-between ">
        <div className="w-full max-w-md flex flex-col items-center ">
          <input
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-50 px-3 mb-4 py-2 w-full border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            onClick={() => perfromSearch(searchUser)}
            className=" mb-4 inset-y-0 right-0 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-20"
          >
            Search
          </button>
        </div>

        {show && (
          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter amount owed"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-3 py-2 w-full border border-gray-400 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              onClick={() => handleClick(amount)}
            >
              Add debtor
            </button>
          </div>
        )}
      </div>
      <div className="text-2xl mt-10 mb-5 font-bold">Debtors: </div>
      <div className="flex flex-wrap">
        {debtors.map((user) => (
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
    </div>
  );
}
