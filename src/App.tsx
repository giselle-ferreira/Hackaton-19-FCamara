import React from "react";
import { Routes } from "./routes";
import "./global.css";
import { Header } from "./pages/Header";
import { Footer } from "./pages/Footer";
function App() {
  return(
  <>
  <Header />
  <Routes />
  <Footer />
  </>);
}

export default App;
