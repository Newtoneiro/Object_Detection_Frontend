/**
 * @file SettingsPage.tsx
 * @description SettingsPage component.
 */
import { ScrollView, Text } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { CameraType } from "expo-camera";
import { useContext } from "react";
import { Background } from "../../components/Utils/Background";
import { CrossedFooter } from "../../components/Utils/CrossedFooter";
import { Setting } from "../../components/Utils/Setting";
import { stylesConfig } from "../../config";
import {
  FrameRate,
  Quality,
  Ratio,
  possibleFrameRates,
  possibleQualities,
  possibleRatios,
} from "../../config/config.types";
import { OptionsContext } from "../../contexts/OptionsContext";
import { settingsPageStyles } from "./SettingsPage.styles";
import { SettingsPageProps } from "./SettingsPage.types";

/**
 * @component
 *
 * Settings page component.
 *
 * @description
 *
 * This component displays the settings page. It is used to change the settings.
 *
 * @param {SettingsPageProps} props - The props object.
 * @param {import("react-navigation").NavigationProp<import("react-navigation").NavigationState>} props.navigation - The navigation prop.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { SettingsPage } from './SettingsPage';
 *
 * const SomeComponent = () => {
 *  return (
 *    <SettingsPage />
 *  );
 * };
 *
 * @see {@link SettingsPageProps} for the props object type.
 * @see {@link settingsPageStyles} for the styles.
 */
export const SettingsPage = ({ navigation }: SettingsPageProps) => {
  const OptionsCon = useContext(OptionsContext);

  return (
    <Background handlePressFunction={() => navigation.goBack()}>
      <MaterialIcons
        style={settingsPageStyles.titleImage}
        name="settings"
        size={stylesConfig.fontSize.title_icon}
      />
      <Text style={settingsPageStyles.formTitle}>Settings</Text>
      <ScrollView
        style={settingsPageStyles.container}
        contentContainerStyle={settingsPageStyles.contentContainer}
      >
        <CrossedFooter>
          <Text style={settingsPageStyles.settingsTitle}>Picture Mode</Text>
        </CrossedFooter>
        <Setting<Quality>
          value={OptionsCon.cameraOptions.quality}
          name="quality"
          possibleValues={possibleQualities}
          handleChangeValue={(newQuality: Quality) =>
            OptionsCon.setCameraOptions({
              ...OptionsCon.cameraOptions,
              quality: newQuality,
            })
          }
          icon="high-quality"
        />
        <Setting<Ratio>
          value={OptionsCon.cameraOptions.ratio}
          name="ratio"
          possibleValues={possibleRatios}
          handleChangeValue={(newRatio: Ratio) =>
            OptionsCon.setCameraOptions({
              ...OptionsCon.cameraOptions,
              ratio: newRatio,
            })
          }
          icon="aspect-ratio"
        />
        <Setting<CameraType>
          value={OptionsCon.cameraOptions.type}
          name="camera type"
          possibleValues={[CameraType.back, CameraType.front]}
          handleChangeValue={(newType: CameraType) =>
            OptionsCon.setCameraOptions({
              ...OptionsCon.cameraOptions,
              type: newType,
            })
          }
          icon="flip"
        />
        <CrossedFooter>
          <Text style={settingsPageStyles.settingsTitle}>Live Mode</Text>
        </CrossedFooter>
        <Setting<FrameRate>
          value={OptionsCon.liveCameraOptions.frameRate}
          name={`Frames / Prediction`}
          possibleValues={possibleFrameRates}
          handleChangeValue={(newFrameRate: FrameRate) =>
            OptionsCon.setLiveCameraOptions({
              ...OptionsCon.liveCameraOptions,
              frameRate: newFrameRate,
            })
          }
          icon="animation"
        />
        <Setting<Ratio>
          value={OptionsCon.liveCameraOptions.ratio}
          name="ratio"
          possibleValues={possibleRatios}
          handleChangeValue={(newRatio: Ratio) =>
            OptionsCon.setLiveCameraOptions({
              ...OptionsCon.liveCameraOptions,
              ratio: newRatio,
            })
          }
          icon="aspect-ratio"
        />
        <Setting<CameraType>
          value={OptionsCon.liveCameraOptions.type}
          name="camera type"
          possibleValues={[CameraType.back, CameraType.front]}
          handleChangeValue={(newType: CameraType) =>
            OptionsCon.setLiveCameraOptions({
              ...OptionsCon.liveCameraOptions,
              type: newType,
            })
          }
          icon="flip"
        />
        <Setting<boolean>
          value={OptionsCon.liveCameraOptions.showDynamicDistance}
          name="distance warning"
          possibleValues={[true, false]}
          handleChangeValue={(newShowWarning: boolean) =>
            OptionsCon.setLiveCameraOptions({
              ...OptionsCon.liveCameraOptions,
              showDynamicDistance: newShowWarning,
            })
          }
          icon="warning"
        />
        <CrossedFooter>
          <Text style={settingsPageStyles.settingsTitle}>Server options</Text>
        </CrossedFooter>
        <Setting<boolean>
          value={OptionsCon.serverOptions.savePhoto}
          name="save photos"
          possibleValues={[true, false]}
          handleChangeValue={(newSavePhoto: boolean) =>
            OptionsCon.setServerOptions({
              ...OptionsCon.serverOptions,
              savePhoto: newSavePhoto,
            })
          }
          icon="save"
        />
      </ScrollView>
    </Background>
  );
};
