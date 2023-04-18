import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <Box sx={{ height: "100%" }}>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </Box>
  );
}

export default App;
