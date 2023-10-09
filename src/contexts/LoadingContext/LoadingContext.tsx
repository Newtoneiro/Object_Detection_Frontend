import { createContext, useEffect, useState } from "react";

import { WEB_CLIENT_ID } from "@env";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { loadAsync } from "expo-font";

import { IProps } from "../../config.types";
import { ILoadingContext } from "./LoadingContext.types";

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

const LoadingProvider = ({ children }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayLoadingCard, setDisplayLoadingCard] = useState<boolean>(false);
  const [loadingCardText, setLoadingCardText] = useState<string | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);

  // Load assets and configure Googlesignin
  useEffect(() => {
    const loadAssets = async () => {
      setDisplayLoadingCard(true);
      setAssetsLoaded(false);
      setLoadingCardText("Loading assets");
      GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
      });
      await loadAsync({
        Montserrat_500Medium,
        Poppins_600SemiBold,
        ...MaterialCommunityIcons.font,
        ...FontAwesome.font,
        ...MaterialIcons.font,
      });
      setAssetsLoaded(true);
      setDisplayLoadingCard(false);
    };

    if (!assetsLoaded) {
      loadAssets();
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
