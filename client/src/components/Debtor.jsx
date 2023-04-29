import { useState, useEffect } from "react";
import axios from "axios";

export default function () {
  const [searchUser, setSearchUser] = useState("");

  const [show, setShow] = useState();
  const [users, setUsers] = useState([{}]);
  const perfromSearch = (user) => {
    axios.get(`http://localhost:5000/user/search?name=${user}`).then((res) => {
      console.log(res.data);
      setUsers([...users, { id: res.data[0]._id, name: res.data[0].name }]);
      setShow(true);
    });
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
      {/* <div>
        <img
          className="rounded-full h-32 w-32"
          src={GroupCard}
          alt="big image"
        ></img>
        <p className="font-medium text-sm">read?</p>
      </div> */}
    </div>
  );
}
