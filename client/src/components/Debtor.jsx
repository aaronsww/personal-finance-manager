import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export default function () {
  const [searchUser, setSearchUser] = useState("");
  const { user } = useContext(AuthContext);

  const [amount, setAmount] = useState(0);

  const [show, setShow] = useState();
  const [debtor, setDebtor] = useState({});
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
      "http://localhost:5000/me/debtors/add",
      { debtorId: debtor.id, amount: amount },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
  };

  return (
    <div>
      <button>+ Debtors</button>
      <input
        type="text"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        placeholder="Search"
        className="bg-white-200 border-none focus:outline-none rounded-md py-1 px-2"
      />
      <button onClick={() => perfromSearch(searchUser)}>Search</button>
      {show && (
        <div>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount Owed"
            className="bg-white-200 border-none focus:outline-none rounded-md py-1 px-2"
          />
          {debtor.name}
          <button onClick={() => handleClick(amount)}>Submit</button>
        </div>
      )}
    </div>
  );
}
