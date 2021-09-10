import React from "react";
import { Routes } from "./routes";
import "./global.css";
import { Toaster } from "react-hot-toast";
import { UserStorage } from "./Context/UserContext";
function App() {
  return (
    <UserStorage>  
      <Routes />
      <Toaster position="top-center" reverseOrder={false} />
    </UserStorage>
  );
}

export default App;
