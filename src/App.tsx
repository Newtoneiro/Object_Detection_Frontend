import "expo-dev-client";

import { WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AuthGate from "./components/AuthGate/AuthGate";
import AnimatedLoadingCard from "./components/Utils/AnimatedLoadingCard/AnimatedLoadingCard";
import ErrorPopup from "./components/Utils/ErrorPopup/ErrorPopup";
import LoadingOverlay from "./components/Utils/LoadingOverlay/LoadingOverlay";
import AppContextProvider from "./contexts/AppContextProvider";

const App = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });

  return (
    <AppContextProvider>
      <ErrorPopup />
      <LoadingOverlay />
      <AnimatedLoadingCard />
      <AuthGate />
    </AppContextProvider>
  );
};

export default App;
