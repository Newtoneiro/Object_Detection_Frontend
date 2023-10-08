import {
  Quality,
  Ratio,
  possibleQualities,
  possibleRatios,
} from "../../contexts/CameraContext/CameraContext.types";
import { ScrollView, Text } from "react-native";

import Background from "../../components/Utils/Background/Background";
import { CameraContext } from "../../contexts/CameraContext/CameraContext";
import { CameraType } from "expo-camera";
import CrossedFooter from "../../components/Utils/CrossedFooter/CrossedFooter";
import { MaterialIcons } from "@expo/vector-icons";
import Setting from "../../components/Utils/Setting/Setting";
import { SettingsPageProps } from "./SettingsPage.types";
import { settingsPageStyles } from "./SettingsPage.styles";
import stylesConfig from "../../config.styles";
import { useContext } from "react";
import { LiveCameraContext } from "../../contexts/LiveCameraContext/LiveCameraContext";
import {
  FrameRate,
  possibleFrameRates,
} from "../../contexts/LiveCameraContext/LiveCameraContext.types";

const SettingsPage = ({ navigation }: SettingsPageProps) => {
  const CameraCon = useContext(CameraContext);
  const LiveCameraCon = useContext(LiveCameraContext);

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
          value={CameraCon.cameraOptions.quality}
          name="quality"
          possibleValues={possibleQualities}
          handleChangeValue={(newQuality: Quality) =>
            CameraCon.setCameraOptions({
              ...CameraCon.cameraOptions,
              quality: newQuality,
            })
          }
          icon="high-quality"
        />
        <Setting<Ratio>
          value={CameraCon.cameraOptions.ratio}
          name="ratio"
          possibleValues={possibleRatios}
          handleChangeValue={(newRatio: Ratio) =>
            CameraCon.setCameraOptions({
              ...CameraCon.cameraOptions,
              ratio: newRatio,
            })
          }
          icon="aspect-ratio"
        />
        <Setting<CameraType>
          value={CameraCon.cameraOptions.type}
          name="camera type"
          possibleValues={[CameraType.back, CameraType.front]}
          handleChangeValue={(newType: CameraType) =>
            CameraCon.setCameraOptions({
              ...CameraCon.cameraOptions,
              type: newType,
            })
          }
          icon="flip"
        />
        <CrossedFooter>
          <Text style={settingsPageStyles.settingsTitle}>Live Mode</Text>
        </CrossedFooter>
        <Setting<FrameRate>
          value={LiveCameraCon.liveCameraOptions.frameRate}
          name={`predict every [${LiveCameraCon.liveCameraOptions.frameRate}] frames`}
          possibleValues={possibleFrameRates}
          handleChangeValue={(newFrameRate: FrameRate) =>
            LiveCameraCon.setLiveCameraOptions({
              ...LiveCameraCon.liveCameraOptions,
              frameRate: newFrameRate,
            })
          }
          icon="animation"
        />
        <Setting<Ratio>
          value={LiveCameraCon.liveCameraOptions.ratio}
          name="ratio"
          possibleValues={possibleRatios}
          handleChangeValue={(newRatio: Ratio) =>
            LiveCameraCon.setLiveCameraOptions({
              ...LiveCameraCon.liveCameraOptions,
              ratio: newRatio,
            })
          }
          icon="aspect-ratio"
        />
        <Setting<CameraType>
          value={LiveCameraCon.liveCameraOptions.type}
          name="camera type"
          possibleValues={[CameraType.back, CameraType.front]}
          handleChangeValue={(newType: CameraType) =>
            LiveCameraCon.setLiveCameraOptions({
              ...LiveCameraCon.liveCameraOptions,
              type: newType,
            })
          }
          icon="flip"
        />
        <CrossedFooter>
          <Text style={settingsPageStyles.settingsTitle}>Server options</Text>
        </CrossedFooter>
        <Setting<boolean>
          value={CameraCon.cameraOptions.savePhoto}
          name="save photos"
          possibleValues={[true, false]}
          handleChangeValue={(newSavePhoto: boolean) =>
            CameraCon.setCameraOptions({
              ...CameraCon.cameraOptions,
              savePhoto: newSavePhoto,
            })
          }
          icon="save"
        />
      </ScrollView>
    </Background>
  );
};

export default SettingsPage;
