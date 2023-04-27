import { createContext, useEffect, useState } from "react";

export interface User {
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
  changeAdmin: (id: string, isAdmin: boolean) => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  setUser: () => {},
  logout: () => {},
  getAllUsers: async () => [],
  removeUser: async () => {},
  changeAdmin: async () => {},
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
        // console.log(userData);
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
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  async function changeAdmin(id: string, isAdmin: boolean) {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating admin status:", error);
      throw error;
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, getAllUsers, removeUser, changeAdmin }}>
      {children}
    </UserContext.Provider>
  );
}
