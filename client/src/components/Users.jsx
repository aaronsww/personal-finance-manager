import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

function Users() {
  // const [users, setUsers] = useState(["Faiz", "Jeevan", "Trevis"]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/search")
      .then((res) => setUsers(res.data));
  });

  console.log(users);

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
        {users.map((user) => (
          <Card username={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
