// import { ThemeOptions } from "@mui/material";
declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      primary: {
        main: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        dark: string;
        contrastText: string;
      };
      success: {
        main: string;
      };
      warning: {
        main: string;
      };
      common: {
        white: string;
        black: string;
      };
      divider: string;
    };
    // typography: {
    //   fontFamily: "Open Sans, serif",
    //   fontSize: 11,
    // },
    spacing: number;
  }
}
interface ThemeOptions {
  palette: {
    primary: {
      main: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      dark: string;
      contrastText: string;
    };
    success: {
      main: string;
    };
    warning: {
      main: string;
    };
    common: {
      white: string;
      black: string;
    };
    divider: string;
  };
  // typography: {
  //   fontFamily: "Open Sans, serif",
  //   fontSize: 11,
  // },
  spacing: number;
}
