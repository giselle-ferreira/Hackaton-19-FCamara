import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { api } from "../../services/api";
import { Header } from "../Header";

export const Home = () => {
  const userContext = useContext(UserContext);
  return (
    <>
    <Header />
    <div>
      <h1>{userContext?.data.name}</h1>
    </div>
    </>
  );
};
