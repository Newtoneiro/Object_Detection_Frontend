/**
 * @file LoadingContext.tsx
 * @description LoadingContext component.
 */
import { createContext, useContext, useEffect, useState } from "react";

import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { loadAsync } from "expo-font";

import { IProps } from "../../config";
import { ErrorContext } from "../ErrorContext";
import { ILoadingContext } from "./LoadingContext.types";

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

/**
 * @object
 *
 * Loading context object.
 *
 * @description
 *
 * This context provides all the necessary functions and variables for handling
 * loading functionality in the whole application.
 *
 * @example
 * import { LoadingContext } from "../contexts/LoadingContext/LoadingContext";
 *
 * const CameraPage = () => {
 *  const LoadingCon = useContext(LoadingContext);
 *
 *  LoadingContext.setLoading(true);
 *  return (...)
 * };
 *
 * @see {@link ILoadingContext} for more information on the context object
 */
const LoadingContext = createContext<ILoadingContext>(defaultLoadingContext);

/**
 * @component
 *
 * Loading provider component.
 *
 * @description
 *
 * This component provides the {@link LoadingContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { LoadingProvider } from './LoadingProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <LoadingProvider>
 *      <SomeOtherComponent />
 *    </LoadingProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link LoadingContext} for the context object.
 */
const LoadingProvider = ({ children }: IProps) => {
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
