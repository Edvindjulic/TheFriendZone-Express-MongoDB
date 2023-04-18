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
import "./index.css";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Startpage from "./pages/Startpage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Startpage />} />
      <Route
        path="profile"
        element={<Profile />}
      />
      <Route path="admin" element={<Admin />} />
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Route>
  )
);

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
