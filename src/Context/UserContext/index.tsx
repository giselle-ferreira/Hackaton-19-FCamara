import React, { ReactNode, createContext } from "react";

type StoreDataProps = {
  name: string;
  email: string;
  id: number;
  jwt: string;
};
type UserContextData = {
  data: {
    name: string;
    email: string;
    id: number;
  };
  storeData: (data: StoreDataProps) => void;
};
type UserContextProps = {
  children: ReactNode;
};
export const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserStorage = ({ children }: UserContextProps) => {
  const [data, setData] = React.useState({ name: "", email: "", id: 0 });

  const storeData = ({ name, email, id, jwt }: StoreDataProps) => {
    setData({ name, email, id });
  };

  return (
    <UserContext.Provider value={{ data, storeData }}>
      {children}
    </UserContext.Provider>
  );
};
