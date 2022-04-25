const backgroundDefault = "#202343";

const TeguThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#8D71F3",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#7379B0",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FA6E6E",
      contrastText: "#FFFFFF",
    },
    // Find colors for these
    // warning: {},
    // info: {},
    success: {
      main: "#25D366",
      contrastText: "#FFFFFF",
    },
    common: {
      black: "#15182C",
      white: "#FFFFFF",
    },
    // grey: {},
    text: {
      primary: "#D7DBFA",
      secondary: "#7379B0",
      disabled: "#7379B0",
    },
    divider: "#7379B0",
    // action: {},
    background: {
      default: backgroundDefault,
      paper: "#2C315B",
    },
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        content: {
          width: "100%",
        },
      },
    },
  },
};

export { TeguThemeOptions };
