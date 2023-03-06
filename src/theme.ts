import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#86b9ec",
      contrastText: "#fff",
    },
    secondary: {
      main: "#6aaf5d",
      dark: "#87d279",
      contrastText: "#fff",
    },
    success: {
      main: "#008000",
    },
    warning: {
      main: "#FF0000",
    },
    common: {
      white: "#fff",
      black: "#000",
    },
    divider: "#eaeaea",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: purple[200],
        },
      },
    },
  },
  // typography: {
  //   fontFamily: "Open Sans, serif",
  //   fontSize: 11,
  // },
  spacing: 2,
});
