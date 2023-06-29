import AuthGate from "./components/AuthGate/AuthGate";
import { AuthProvider } from "./contexts/Authcontext/AuthContext";
import { LoginProvider } from "./contexts/LoginContext/LoginContext";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Poppins_600SemiBold,
  });

  return (
    fontsLoaded && (
      <AuthProvider>
        <LoginProvider>
          <AuthGate />
        </LoginProvider>
      </AuthProvider>
    )
  );
};

export default App;
