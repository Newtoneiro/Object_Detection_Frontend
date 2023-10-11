import { createContext, useContext, useEffect, useState } from "react";

import { IProps } from "../../config.types";
import {
  ICameraOptions,
  ILiveCameraOptions,
  IOptionsContext,
  IServerOptions,
  defaultCameraOptions,
  defaultLiveCameraOptions,
  defaultServerOptions,
} from "./OptionsContext.types";
import { ErrorContext } from "../ErrorContext/ErrorContext";
import { LoadingContext } from "../LoadingContext/LoadingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultOptionsContext: IOptionsContext = {
  cameraOptions: defaultCameraOptions,
  liveCameraOptions: defaultLiveCameraOptions,
  serverOptions: defaultServerOptions,
  setCameraOptions: (_) => {},
  setLiveCameraOptions: (_) => {},
  setServerOptions: (_) => {},
};

const OptionsContext = createContext<IOptionsContext>(defaultOptionsContext);

const OptionsProvider = ({ children }: IProps) => {
  const [cameraOptions, setCameraOptions] = useState<ICameraOptions | null>(
    null
  );
  const [liveCameraOptions, setLiveCameraOptions] =
    useState<ILiveCameraOptions | null>(null);
  const [serverOptions, setServerOptions] = useState<IServerOptions | null>(
    null
  );

  const LoadingCon = useContext(LoadingContext);
  const ErrorCon = useContext(ErrorContext);

  const loadUserOptions = (rawOptions: any, defaultOptions: any) => {
    const storedOptions = rawOptions ? JSON.parse(rawOptions) : {};
    for (var propertyName in storedOptions) {
      defaultOptions[propertyName] &&
        (defaultOptions[propertyName] = storedOptions[propertyName]);
    }
    return defaultOptions;
  };

  useEffect(() => {
    const getSavedOptions = async () => {
      LoadingCon.setDisplayLoadingCard(true);
      LoadingCon.setLoadingCardText("Loading settings");
      // Camera Options
      const rawCameraOptions = await AsyncStorage.getItem("cameraOptions");
      const storedCameraOptions = loadUserOptions(
        rawCameraOptions,
        defaultCameraOptions
      );
      setCameraOptions(storedCameraOptions);

      // Live Camera Options
      const rawLiveCameraOptions = await AsyncStorage.getItem(
        "liveCameraOptions"
      );
      const storedLiveCameraOptions = loadUserOptions(
        rawLiveCameraOptions,
        defaultLiveCameraOptions
      );
      setLiveCameraOptions(storedLiveCameraOptions);

      // Server Options
      const rawServerOptions = await AsyncStorage.getItem("serverOptions");
      const storedServerOptions = loadUserOptions(
        rawServerOptions,
        defaultServerOptions
      );
      setServerOptions(storedServerOptions);

      LoadingCon.setDisplayLoadingCard(false);
    };

    getSavedOptions();
  }, []);

  // Store options
  useEffect(() => {
    console.log("save");
    const saveOptions = async () => {
      LoadingCon.setLoading(true);
      await AsyncStorage.setItem(
        "cameraOptions",
        JSON.stringify(cameraOptions)
      );
      await AsyncStorage.setItem(
        "liveCameraOptions",
        JSON.stringify(liveCameraOptions)
      );
      await AsyncStorage.setItem(
        "serverOptions",
        JSON.stringify(serverOptions)
      );
      LoadingCon.setLoading(false);
    };

    saveOptions();
  }, [cameraOptions, liveCameraOptions, serverOptions]);

  return (
    <OptionsContext.Provider
      value={{
        cameraOptions: cameraOptions ? cameraOptions : defaultCameraOptions,
        liveCameraOptions: liveCameraOptions
          ? liveCameraOptions
          : defaultLiveCameraOptions,
        serverOptions: serverOptions ? serverOptions : defaultServerOptions,
        setCameraOptions,
        setLiveCameraOptions,
        setServerOptions,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export { OptionsContext, OptionsProvider };
