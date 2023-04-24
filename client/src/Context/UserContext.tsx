import { createContext, useState, ReactNode, useContext } from "react";

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};