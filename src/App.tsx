import AuthGate from "./components/AuthGate/AuthGate";
import { AuthProvider } from "./contexts/Authcontext/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
};

export default App;
