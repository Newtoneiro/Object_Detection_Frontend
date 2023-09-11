import "expo-dev-client";

import AppContextProvider from "./contexts/AppContextProvider";
import AuthGate from "./components/AuthGate/AuthGate";
import ErrorPopup from "./components/Utils/ErrorPopup/ErrorPopup";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import LoadingOverlay from "./components/Utils/LoadingOverlay/LoadingOverlay";
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
      <AppContextProvider>
        <ErrorPopup />
        <LoadingOverlay />
        <AuthGate />
      </AppContextProvider>
    )
  );
};

export default App;
