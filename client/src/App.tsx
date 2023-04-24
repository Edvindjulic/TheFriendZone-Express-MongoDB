import { Box, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { theme } from "./components/theme";
import { PostProvider } from "./Context/PostContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PostProvider>
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
      </PostProvider>
    </ThemeProvider>
  );
}

export default App;
