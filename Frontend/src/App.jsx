import React from "react";
import { AppRoutes } from "./App.routes";
import { AuthProvider } from "./features/auth.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;