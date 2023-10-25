import * as expoCameraCharacteristics from "@appandflow/expo-camera-characteristics";
import averageHeights from "../../averageHeights";

const calculateDistance = (
  bboxHeight: number,
  imageHeight: number,
  objectClass: string
) => {
  const { focalLength, sensorSize } =
    expoCameraCharacteristics.getCameraCharacteristics();

  const bboxOnSensorHeight =
    (bboxHeight * (sensorSize.height / 1000)) / imageHeight;

  const objectHeight = Number(averageHeights[objectClass as keyof Object]);

  return (objectHeight * (focalLength / 1000)) / bboxOnSensorHeight;
};

export { calculateDistance };
