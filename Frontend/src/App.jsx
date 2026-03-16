import React from "react";
import { AppRoutes } from "./App.routes";
import { AuthProvider } from "./features/auth.context.jsx";

const App = () => {
  <AuthProvider>
    return <AppRoutes />;
  </AuthProvider>
};

export default App;