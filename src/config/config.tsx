/**
 * @file config.tsx
 * @description Global configuration.
 */

/**
 * Represents the global configuration.
 * @constant {Object}
 *
 * @property {Object} paths - The paths object.
 * @property {string} paths.home - The home path.
 * @property {string} paths.auth - The authentication path.
 * @property {string} paths.object_detection - The object detection path.
 * @property {number} timeout - The timeout in milliseconds.
 * @property {Object} live_camera - The live camera configuration.
 * @property {number} live_camera.RESIZE_WIDTH - The width of the resized image.
 * @property {number} live_camera.RESIZE_HEIGHT - The height of the resized image.
 * @property {number} live_camera.RESIZE_DEPTH - The depth of the resized image.
 * @property {number} timeBetweenTensorSaves - The time between tensor saves in milliseconds.
 * @property {number} timeBetweenTensorSavesRetries - The time between tensor saves retries in milliseconds.
 * @property {number} distance_risk_margin - The distance risk margin used to determine danger level based on distance estimation.
 */
export const config = {
  paths: {
    home: "http://192.168.29.5:8888",
    auth: "/auth",
    object_detection: "/objectDetection",
  },
  timeout: 5000,
  live_camera: {
    RESIZE_WIDTH: 152,
    RESIZE_HEIGHT: 200,
    RESIZE_DEPTH: 3,
  },
  timeBetweenTensorSaves: 2 * 60 * 1000, // 2 min in miliseconds
  timeBetweenTensorSavesRetries: 5 * 1000, // 5 seconds in milliseconds
  distance_risk_margin: 0.2,
};
