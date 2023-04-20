import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import LoggedIn from "./components/LoggedIn";
import { theme } from "./components/theme";
import "./index.css";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Startpage from "./pages/Startpage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Startpage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin" element={<Admin />} />
      <Route path="login" element={<LoggedIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
