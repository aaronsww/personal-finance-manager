import React from "react";
import Users from "./Users";

function Home() {
  return (
    <div>
      <nav class="flex justify-between items-center bg-white h-16 p-0 m-0 shadow-md">
        <div class="text-xl font-bold">Logo</div>

        <div class="flex items-center">
          <button class=" text-black font-serif rounded-md px-4 py-2 mr-4">
            Profile
          </button>
          <button class=" text-black font-serif rounded-md px-4 py-2 mr-4">
            Credit
          </button>
          <button class="text-black font-serif rounded-md px-4 py-2">
            Debit
          </button>
        </div>
      </nav>
      <Users />
    </div>
  );
}

export default Home;
