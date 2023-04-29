import { useState } from "react";
import Users from "./Users";
import { Link } from "react-router-dom";

function Card({ username }) {
  console.log(username);

  //   const [name, setName] = useState(username);
  return (
    <Link>
      <div className="flex flex-col items-center ml-10">
        <img className="rounded-full" src="" alt="big image"></img>
        <h2 className="font-bold text-xl">{username}</h2>{" "}
      </div>
    </Link>
  );
}

export default Card;
