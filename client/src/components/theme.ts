import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#488BA5",
      contrastText: "#090809",
    },
    secondary: {
      main: "#E3653D",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#f5f5f5",
      default: "#FFFFFF",
    }
  },
  typography: {
    fontFamily: [
      "Source Sans Pro",
      "Libre Franklin",
    ].join(","),
    h5: {
      fontWeight: 600,
      fontFamily: "Libre Franklin",
    },
    h4: {
      fontFamily: "Libre Franklin",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 100,
      fontFamily: "Source Sans Pro",
    }
  }
});
