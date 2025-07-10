// src/App.tsx
import React from "react";
import { CssBaseline, Container } from "@mui/material";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      {/* CssBaseline proporciona una base de estilo consistente en toda la aplicación */}
      <CssBaseline />
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <Dashboard />
      </Container>
    </>
  );
};

export default App;
