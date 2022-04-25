import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Viewport } from "./components/Viewport";
import { TeguThemeOptions } from "./theme";

function App() {
  const theme = createTheme(TeguThemeOptions);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Viewport />
      </ThemeProvider>
    </div>
  );
}

export { App };
