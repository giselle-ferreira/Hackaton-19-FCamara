import React, { ReactNode, createContext, useEffect } from "react";
import { api } from "../../services/api";

type StoreDataProps = {
  name: string;
  email: string;
  id: number;
};
type UserContextData = {
  data: {
    name: string;
    email: string;
    id: number;
  };
  storeData: (data: StoreDataProps) => void;
  clearData: () => void;
};
type UserContextProps = {
  children: ReactNode;
};
export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

export const UserStorage = ({ children }: UserContextProps) => {
  const [data, setData] = React.useState({ name: "", email: "", id: 0 });
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
          storeData({ name, email, id });
        });
    }
  }, []);
  const storeData = ({ name, email, id }: StoreDataProps) => {
    setData({ name, email, id });
  };
  const clearData = () => {
    setData({ name: "", email: "", id: 0 });
    window.localStorage.removeItem("fcalendartoken");
  };
  return (
    <UserContext.Provider value={{ data, storeData, clearData }}>
      {children}
    </UserContext.Provider>
  );
};
