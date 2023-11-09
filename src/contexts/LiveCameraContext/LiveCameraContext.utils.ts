import * as expoCameraCharacteristics from "@appandflow/expo-camera-characteristics";
import averageHeights from "../../config/averageHeights";

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

const getTimestampFromDate = (date: Date | null = null): string => {
  const currentDate = date || new Date();

  // Get year, month, day, hour, minute, and second
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hour = String(currentDate.getHours()).padStart(2, "0");
  const minute = String(currentDate.getMinutes()).padStart(2, "0");
  const second = String(currentDate.getSeconds()).padStart(2, "0");

  const timestamp = `${year}-${month}-${day}-${hour}-${minute}-${second}`;

  return timestamp;
};

const getDateFromTimestamp = (timestamp: string | null = null): Date => {
  if (!timestamp) {
    return new Date();
  }

  const [year, month, day, hour, minute, second]: number[] = timestamp
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day, hour, minute, second);
};

export { calculateDistance, getTimestampFromDate, getDateFromTimestamp };
