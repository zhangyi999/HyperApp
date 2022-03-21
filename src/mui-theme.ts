import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#07e3e4",
    },
    error: {
      main: "#d500f9",
    },
    background: {
      paper: "#333",
    },
    text: {
      primary: "#FFF",
      secondary: "#a38bf0",
    },
  },

  components: {
    MuiPaper: {
      defaultProps: {},
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    // Name of the component ⚛️
    // MuiButtonBase: {
    //   defaultProps: {
    //     // The props to apply
    //     disableRipple: true, // No more ripple, on the whole application 💣!
    //   },
    // },
  },
});

export default theme;
