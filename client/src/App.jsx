import { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import Card from "./components/Card";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Wallet from "./components/Wallet";
import { AuthProvider } from "./components/AuthProvider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
