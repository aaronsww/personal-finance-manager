import { useState } from "react";
import Users from "./Users";
import { Link } from "react-router-dom";
function Card({ username, id }) {
  console.log(username);

  return (
    <Link to="/chat">
      <div className="flex flex-col items-center ml-10">
        <img className="rounded-full h-40 w-40" src="" alt="big image"></img>
        <h2 className="font-bold text-xl">{username}</h2>{" "}
      </div>
    </Link>
  );
}

export default Card;
