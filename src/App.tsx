import React from "react";
import { Routes } from "./routes";
import "./global.css";
import { Header } from "./pages/Header";
import { Footer } from "./pages/Footer";
import { Toaster } from "react-hot-toast";
import { UserStorage } from "./Context/UserContext";
function App() {
  return (
    <UserStorage>
      <Header />
      <Routes />
      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </UserStorage>
  );
}

export default App;
