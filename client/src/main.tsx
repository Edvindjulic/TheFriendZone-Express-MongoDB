import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import { PostProvider } from "./Context/PostContext";
import UserProvider from "./Context/UserContext";
import LoggedIn from "./components/LoggedIn";
import SinglePost from "./components/SinglePost";
import { theme } from "./components/theme";
import "./index.css";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Startpage from "./pages/Startpage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Startpage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin" element={<Admin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="loggedIn" element={<LoggedIn />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="post/:id" element={<SinglePost />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <PostProvider>
          <RouterProvider router={router} />
        </PostProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
