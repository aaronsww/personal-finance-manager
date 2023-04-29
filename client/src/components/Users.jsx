import { useEffect, useState } from "react";
import Card from "./Card";

function Users() {
  //   useEffect(() => {});

  const [users, setUsers] = useState(["Faiz", "Jeevan", "Trevis"]);

  console.log(users);

  return (
    <div className="h-40 bg-sky-100 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-start text-black font-serif text-lg">Users</h1>
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
