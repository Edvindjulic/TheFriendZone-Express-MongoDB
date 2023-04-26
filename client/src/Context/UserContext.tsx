import { createContext, useEffect, useState } from "react";

interface User {
  _id?: string;
  id?: string;
  username: string;
  isAdmin: boolean;
}

interface UserContextType {
  user?: User;
  setUser: (user?: User) => void;
  logout: () => void;
  getAllUsers: () => Promise<User[]>;
}

export const UserContext = createContext<UserContextType>({
  setUser: () => {},
  logout: () => {},
  getAllUsers: async () => [],
});

interface Props {
  children: React.ReactNode;
}

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  // Handledning från David. Hämta user från server vid refresh av sidan.
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log(userData);
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    };
    fetchData();
  }, []);

  async function logout() {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(undefined);
      } else {
        console.error("Error logging out, status:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  }

  async function getAllUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, getAllUsers }}>
      {children}
    </UserContext.Provider>
  );
}
