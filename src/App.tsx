import "expo-dev-client";

import AuthGate from "./components/AuthGate/AuthGate";
import { AuthProvider } from "./contexts/Authcontext/AuthContext";
import { ForgotPasswordProvider } from "./contexts/ForgotPasswordContext/ForgotPasswordContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginProvider } from "./contexts/LoginContext/LoginContext";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { WEB_CLIENT_ID } from "@env";
import { useFonts } from "expo-font";

const App = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Poppins_600SemiBold,
  });

  return (
    fontsLoaded && (
      <AuthProvider>
        <LoginProvider>
          <ForgotPasswordProvider>
            <AuthGate />
          </ForgotPasswordProvider>
        </LoginProvider>
      </AuthProvider>
    )
  );
};

export default App;
