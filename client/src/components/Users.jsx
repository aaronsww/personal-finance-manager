import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

function Users() {
  // const [users, setUsers] = useState(["Faiz", "Jeevan", "Trevis"]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState();
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/user/search").then((res) => {
      console.log(res.data);
      setUsers(res.data);
      setShow(true);
    });
  }, []);

  const perfromSearch = (user) => {
    axios.get(`http://localhost:5000/user/search?name=${user}`).then((res) => {
      console.log(res.data);
      setUsers(res.data);
      setShow(true);
    });
  };

  return (
    <div className="py  -10 bg-sky-100 p-4">
      <div className="flex justify-between items-center">
        <p className="text-start text-black text-3xl ml-12 mb-6 font-bold ">
          Users
        </p>
        <input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Search"
          className="bg-white-200 border-none focus:outline-none rounded-md py-1 px-2"
        />
        <button onClick={() => perfromSearch(searchUser)}>Search</button>
      </div>

      <div className="flex flex-wrap mt-4">
        {show &&
          users.map((user) => <Card username={user.name} id={user._id} />)}
      </div>
    </div>
  );
}

export default Users;
