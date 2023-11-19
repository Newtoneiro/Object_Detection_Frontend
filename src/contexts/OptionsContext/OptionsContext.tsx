/**
 * @file OptionsContext.tsx
 * @description OptionsContext component.
 */
import { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProps } from "../../config";
import { SettingsPage } from "../../pages/SettingsPage/SettingsPage";
import { LoadingContext } from "../LoadingContext";
import {
  ICameraOptions,
  ILiveCameraOptions,
  IOptionsContext,
  IServerOptions,
  defaultCameraOptions,
  defaultLiveCameraOptions,
  defaultServerOptions,
} from "./OptionsContext.types";

const defaultOptionsContext: IOptionsContext = {
  cameraOptions: defaultCameraOptions,
  liveCameraOptions: defaultLiveCameraOptions,
  serverOptions: defaultServerOptions,
  setCameraOptions: (_) => {},
  setLiveCameraOptions: (_) => {},
  setServerOptions: (_) => {},
};

/**
 * @object
 *
 * Options context object.
 *
 * @description
 *
 * This context provides all the necessary functions and variables for handling
 * options functionality. Mainly used in the {@link SettingsPage} component.
 *
 * @example
 * import { OptionsContext } from "../contexts/OptionsContext/OptionsContext";
 *
 * const CameraPage = () => {
 *  const OptionsCon = useContext(OptionsContext);
 *
 *  OptionsContext.setCameraOptions(...);
 *  return (...)
 * };
 *
 * @see {@link IOptionsContext} for more information on the context object
 */
const OptionsContext = createContext<IOptionsContext>(defaultOptionsContext);

/**
 * @component
 *
 * Options provider component.
 *
 * @description
 *
 * This component provides the {@link OptionsContext} to all its children.
 *
 * @param {IProps} props - The props object.
 * @param {JSX.Element} props.children - The children of the component.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { OptionsProvider } from './OptionsProvider';
 *
 * const SomeComponent = () => {
 *  return (
 *    <OptionsProvider>
 *      <SomeOtherComponent />
 *    </OptionsProvider>
 *  );
 * };
 *
 * @see {@link IProps} for the props object.
 * @see {@link OptionsContext} for the context object.
 */
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
