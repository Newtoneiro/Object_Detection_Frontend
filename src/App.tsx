import { AuthProvider } from "./contexts/Authcontext/AuthContext";

import Router from "./components/Router/Router";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
