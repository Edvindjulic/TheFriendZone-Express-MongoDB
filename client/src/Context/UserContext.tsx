import {
  createContext,
  useEffect,
  useState,
} from "react";

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

interface UserContextType {
  user?: User;
  setUser: (user?: User) => void;
}

export const UserContext =
  createContext<UserContextType>({
    setUser: () => {},
  });

interface Props {
  children: React.ReactNode;
}

export default function UserProvider({
  children,
}: Props) {
  const [user, setUser] = useState<User>();
// Handledning från David. Hämta user från server vid refresh av sidan.
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "/api/users/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(await response.json());
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
