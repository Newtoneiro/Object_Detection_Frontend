/**
 * @file LiveCameraContext.utils.ts
 * @description LiveCameraContext utils.
 */
import * as expoCameraCharacteristics from "@appandflow/expo-camera-characteristics";
import { averageHeights } from "../../config";

/**
 * Calculates the distance from the given bbox height, image height, and object class.
 * @function calculateDistance
 * @param {number} bboxHeight - The bbox height.
 * @param {number} imageHeight - The image height.
 * @param {string} objectClass - The object class.
 *
 * @returns {number} - The calculated distance in meters.
 *
 * @example
 * calculateDistance(100, 1000, "person");
 * // => 10
 */
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

/**
 * Gets the timestamp from the given date. It is used to determine when the next
 * tensor should be saved on the server.
 * @function getTimestampFromDate
 * @param {Date} date - The date.
 * @returns {string} - The timestamp.
 *
 * @example
 * getTimestampFromDate(new Date());
 * // => "2021-01-01-00-00-00"
 */
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

/**
 * Gets the date from the given timestamp. It is used to determine when the next
 * tensor should be saved on the server.
 * @function getDateFromTimestamp
 * @param {string} timestamp - The timestamp.
 * @returns {Date} - The date.
 *
 * @example
 * getDateFromTimestamp("2021-01-01-00-00-00");
 * // => new Date("2021-01-01T00:00:00.000Z")
 */
const getDateFromTimestamp = (timestamp: string | null = null): Date => {
  if (!timestamp) {
    return new Date();
  }

  const [year, month, day, hour, minute, second]: number[] = timestamp
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day, hour, minute, second);
};

export { calculateDistance, getDateFromTimestamp, getTimestampFromDate };
