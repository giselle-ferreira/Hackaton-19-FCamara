import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { api } from "../../services/api";
import { Header } from "../Header";

export const Home = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    const token = window.localStorage.getItem("fcalendartoken");
    console.log(token);
    if (token) {
      api
        .get("sessions", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          const { name, email, id } = response.data.user;
          userContext.storeData({ name, email, id });
        });
    }
  }, []);
  return (
    <>
    <Header />
    <div>
      <h1>{userContext?.data.name}</h1>
    </div>
    </>
  );
};
