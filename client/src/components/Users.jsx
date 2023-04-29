import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

function Users() {
  // const [users, setUsers] = useState(["Faiz", "Jeevan", "Trevis"]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/user/search").then((res) => {
      console.log(res.data);
      setUsers(res.data);
      setShow(true);
    });
  }, []);

  // console.log(users);

  return (
    <div className="h-40 bg-sky-100 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-start text-black font-serif text-lg font-black">
          Users
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="bg-white-200 border-none focus:outline-none rounded-md py-1 px-2"
        />
      </div>

      <div className="flex flex-wrap mt-4">
        {show &&
          users.map((user) => <Card username={user.name} id={user._id} />)}
      </div>
    </div>
  );
}

export default Users;
