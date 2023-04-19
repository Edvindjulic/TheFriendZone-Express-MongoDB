import {
  Box,
  ThemeProvider,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { theme } from "./components/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100%" }}>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
