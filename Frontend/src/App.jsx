import React from "react";
import { AppRoutes } from "./App.routes";
import { AuthProvider } from "./features/auth.context.jsx";
import { interviewprovider } from "./features/interview.context.jsx";

const App = () => {
  return (
      <AuthProvider>
        <interviewprovider>
          <AppRoutes />
        </interviewprovider>
      </AuthProvider>
  );
};

export default App;