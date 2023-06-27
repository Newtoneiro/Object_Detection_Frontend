import AuthGate from "./components/AuthGate/AuthGate";
import { AuthProvider } from "./contexts/Authcontext/AuthContext";
import { LoginProvider } from "./contexts/LoginContext/LoginContext";

const App = () => {
  return (
    <AuthProvider>
      <LoginProvider>
        <AuthGate />
      </LoginProvider>
    </AuthProvider>
  );
};

export default App;
