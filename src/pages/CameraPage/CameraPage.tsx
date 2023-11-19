/**
 * @file CameraPage.tsx
 * @description CameraPage component.
 */
import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import { Camera } from "expo-camera";
import { CameraButton } from "../../components/Utils/CameraButton";
import { CrossedFooter } from "../../components/Utils/CrossedFooter";
import { DetectedRectangle } from "../../components/Utils/DetectedRectangle";
import { PressableIcon } from "../../components/Utils/PressableIcon";
import { stylesConfig } from "../../config";
import { CameraContext } from "../../contexts/CameraContext";
import { OptionsContext } from "../../contexts/OptionsContext";
import { PermissionsContext } from "../../contexts/PermissionsContext";
import { cameraPageStyles } from "./CameraPage.styles";
import { CameraPageProps } from "./CameraPage.types";

/**
 * @component
 *
 * Camera page component.
 *
 * @description
 *
 * This component displays the camera and the captured photo among with
 * the predictions.
 *
 * @param {CameraPageProps} props - The props object.
 * @param {import("react-navigation").NavigationProp<import("react-navigation").NavigationState>} props.navigation - The navigation prop.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { CameraPage } from './CameraPage';
 *
 * const SomeComponent = () => {
 *  return (
 *    <CameraPage />
 *  );
 * };
 *
 * @see {@link CameraPageProps} for the props object type.
 * @see {@link cameraPageStyles} for the styles.
 */
export const CameraPage = ({ navigation }: CameraPageProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  const CameraCon = useContext(CameraContext);
  const OptionsCon = useContext(OptionsContext);
  const PermissionsCon = useContext(PermissionsContext);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setFocused(true);
    });

    navigation.addListener("blur", () => {
      setFocused(false);
    });
  }, [navigation]);

  return focused ? (
    <View style={cameraPageStyles.container}>
      <View style={cameraPageStyles.topPanel}>
        {CameraCon.capturedPhoto ? (
          <PressableIcon
            handlePress={() => CameraCon.resetCamera()}
            icon="keyboard-return"
            size={stylesConfig.fontSize.subtitle}
          />
        ) : (
          <>
            <PressableIcon
              handlePress={() => navigation.goBack()}
              icon="keyboard-return"
              size={stylesConfig.fontSize.subtitle}
            />
            <PressableIcon
              handlePress={() => CameraCon.toggleCameraType()}
              icon="flip-camera-android"
              size={stylesConfig.fontSize.subtitle}
            />
            <PressableIcon
              handlePress={() => navigation.navigate("SettingsPage")}
              icon="settings"
              size={stylesConfig.fontSize.subtitle}
            />
          </>
        )}
      </View>
      <View
        style={{
          width: CameraCon.cameraDimensions.width,
          height: CameraCon.cameraDimensions.height,
        }}
      >
        {PermissionsCon.cameraPermission ? (
          <>
            {CameraCon.capturedPhoto ? (
              <>
                <Image
                  style={{
                    width: CameraCon.cameraDimensions.width,
                    height: CameraCon.cameraDimensions.height,
                  }}
                  source={{
                    uri: CameraCon.capturedPhoto,
                  }}
                />
                {CameraCon.predictions.map((prediction, i) => {
                  return <DetectedRectangle key={i} prediction={prediction} />;
                })}
              </>
            ) : (
              <Camera
                ref={(ref) => {
                  CameraCon.setCameraRef(ref);
                }}
                style={{
                  width: CameraCon.cameraDimensions.width,
                  height: CameraCon.cameraDimensions.height,
                }}
                type={OptionsCon.cameraOptions.type}
                ratio={OptionsCon.cameraOptions.ratio}
              ></Camera>
            )}
          </>
        ) : (
          <View style={cameraPageStyles.noPermissionsView}>
            <CrossedFooter>
              <Text style={cameraPageStyles.noPermissionsText}>
                Allow app to use camera.
              </Text>
            </CrossedFooter>
            <PressableIcon
              handlePress={() => PermissionsCon.handleRequestCameraPermission()}
              icon="lock-open"
              size={stylesConfig.fontSize.subtitle}
            />
          </View>
        )}
      </View>
      <CameraButton handlePress={CameraCon.handleTakePicture} />
    </View>
  ) : (
    <></>
  );
};
