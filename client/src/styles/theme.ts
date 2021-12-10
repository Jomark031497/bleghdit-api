import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#dae0e6",
    },
  },
  typography: {
    fontFamily: "'IBM Plex Sans', sans-serif;",
    button: {
      textTransform: "none",
    },
  },
  mixins: {
    toolbar: {
      minHeight: "8vh",
    },
  },
});

export default theme;
