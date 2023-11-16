import { createContext, useContext, useEffect, useState } from "react";

import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { loadAsync } from "expo-font";

import { globalTypes } from "../../config";
import { ILoadingContext } from "./LoadingContext.types";
import { ErrorContext } from "../ErrorContext/ErrorContext";

import { WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const defaultLoadingContext: ILoadingContext = {
  loading: false,
  displayLoadingCard: false,
  loadingCardText: null,
  assetsLoaded: false,
  setLoading: (_) => {},
  setDisplayLoadingCard: (_) => {},
  setLoadingCardText: (_) => {},
};

const LoadingContext = createContext<ILoadingContext>(defaultLoadingContext);

const LoadingProvider = ({ children }: globalTypes.IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayLoadingCard, setDisplayLoadingCard] = useState<boolean>(false);
  const [loadingCardText, setLoadingCardText] = useState<string | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);

  const ErrorCon = useContext(ErrorContext);

  // Load assets and configure Googlesignin
  useEffect(() => {
    const loadAssets = async () => {
      if (assetsLoaded) {
        return;
      }

      setDisplayLoadingCard(true);
      setLoadingCardText("Loading assets");
      try {
        await loadAsync({
          Montserrat_500Medium,
          Poppins_600SemiBold,
          ...FontAwesome.font,
          ...MaterialIcons.font,
        });
        setAssetsLoaded(true);
      } catch (e) {
        ErrorCon.displayError("Couldn't load assets." + e);
        setAssetsLoaded(false);
      }
      setDisplayLoadingCard(false);
    };

    const configureGoogleSignIn = async () => {
      GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
      });
    };

    if (!assetsLoaded) {
      loadAssets();
      configureGoogleSignIn();
    }
  }, []);

  const handleDisplayLoadingCard = (val: boolean) => {
    if (!val) {
      setLoadingCardText(null);
      setTimeout(() => {
        setDisplayLoadingCard(val);
      }, 1000);
    } else {
      setDisplayLoadingCard(val);
    }
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        displayLoadingCard,
        loadingCardText,
        assetsLoaded,
        setLoading,
        setDisplayLoadingCard: handleDisplayLoadingCard,
        setLoadingCardText,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
