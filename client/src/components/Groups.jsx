import CardGroup from "./GroupCard";
import React from "react";

export default function () {
  return (
    <div className="flex-1 border-2 h-screen">
      <div className="py-10 bg-sky-100 p-4 h-screen">
        <div className="flex justify-between items-center">
          <p className="text-start text-black text-3xl ml-12 mb-6 font-bold ">
            Groups
          </p>
          <CardGroup />
        </div>
      </div>
    </div>
  );
}
