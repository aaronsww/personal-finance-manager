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
import Debtor from "./components/Debtor";
import Creditor from "./components/Creditor";
import { AuthProvider } from "./components/AuthProvider";
import Transaction from "./components/Transaction";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/creditor" element={<Creditor />}></Route>
          <Route path="/debtor" element={<Debtor />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/transaction" element={<Transaction />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
