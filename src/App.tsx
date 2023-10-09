import "expo-dev-client";

import AuthGate from "./components/AuthGate/AuthGate";
import AnimatedLoadingCard from "./components/Utils/AnimatedLoadingCard/AnimatedLoadingCard";
import ErrorPopup from "./components/Utils/ErrorPopup/ErrorPopup";
import LoadingOverlay from "./components/Utils/LoadingOverlay/LoadingOverlay";
import AppContextProvider from "./contexts/AppContextProvider";

const App = () => {
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
