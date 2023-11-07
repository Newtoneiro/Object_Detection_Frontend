const config = {
  paths: {
    home: "http://192.168.169.5:8888",
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

export default config;
