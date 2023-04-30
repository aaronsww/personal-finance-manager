import { useState } from "react";

export default function Transaction() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold mr-4">Title</h2>
        <span className="text-gray-500">$Amt</span>
      </div>
      <button className="bg-green-500 mr-10 p-2 rounded">Settle</button>
      <button className="bg-red-500 p-2 rounded">Decline</button>
    </div>
  );
}
