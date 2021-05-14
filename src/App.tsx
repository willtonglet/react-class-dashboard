import React from "react";
import { AppProvider } from "./contexts/AppContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Routes from "./core/routes";

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
