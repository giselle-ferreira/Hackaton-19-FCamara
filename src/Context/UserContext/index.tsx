import React, { ReactNode, createContext } from "react";

type StoreDataProps = {
  name: string;
  email: string;
};
type UserContextData = {
  data: {
    name: string;
    email: string;
  };
  storeData: (data: StoreDataProps) => void;
};
type UserContextProps = {
  children: ReactNode;
};
export const UserContext = createContext<UserContextData | null>(null);

export const UserStorage = ({ children }: UserContextProps) => {
  const [data, setData] = React.useState({ name: "", email: "" });

  const storeData = ({ name, email }: StoreDataProps) => {
    setData({ name, email });
  };

  return (
    <UserContext.Provider value={{ data, storeData }}>
      {children}
    </UserContext.Provider>
  );
};
