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
  removeUser: (id: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  setUser: () => {},
  logout: () => {},
  getAllUsers: async () => [],
  removeUser: async () => {},
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

  async function removeUser(id: string) {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      // Refresh user list or update the state here if needed
    } catch (error) {
      console.error("Error deleting user:", error);
      // Show an error message to the user if needed
    }
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, getAllUsers, removeUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
