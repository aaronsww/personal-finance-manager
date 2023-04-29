import { useState } from "react";
import Users from "./Users";
import { Link } from "react-router-dom";
import ProfileImage from "../images/profile.jpg";

function Card({ username, id }) {
  console.log(username);

  return (
    <Link to="/chat">
      <div className="flex flex-col items-center ml-10">
        <img
          className="rounded-full h-32 w-32 "
          src={ProfileImage}
          alt="big image"
        ></img>
        <p className="font-medium text-sm">{username}</p>
      </div>
    </Link>
  );
}

export default Card;
