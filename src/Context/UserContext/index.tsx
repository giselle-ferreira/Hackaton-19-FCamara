import React, { ReactNode, createContext } from "react";

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
