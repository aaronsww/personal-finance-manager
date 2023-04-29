import { useState, useEffect } from "react";
import axios from "axios";

export default function () {
  const [searchUser, setSearchUser] = useState("");
  const [amount, setAmount] = useState();

  const [show, setShow] = useState();
  const [users, setUsers] = useState([{}]);
  const perfromSearch = (user) => {
    axios.get(`http://localhost:5000/user/search?name=${user}`).then((res) => {
      console.log(res.data);
      setUsers([...users, { id: res.data[0]._id, name: res.data[0].name }]);
      setShow(true);
    });
  };

  const handleClick = (amount) => {
    axios.post;
  };
  return (
    <div>
      <button>+ Creditors</button>
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
            placeholder="Enter Amount"
            className="bg-white-200 border-none focus:outline-none rounded-md py-1 px-2"
          />
          <button onClick={() => handleClick(amount)}>Submit</button>
        </div>
      )}

      {/* {users.map((user) => user.name)} */}
    </div>
  );
}
