import React from "react";
import { Routes } from "./routes";
import "./global.css";
import { UserStorage } from "./Context/UserContext";
function App() {
  return (
    <UserStorage>
      <Routes />
    </UserStorage>
  );
}

export default App;
