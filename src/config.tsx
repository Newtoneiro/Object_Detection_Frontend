const config = {
  paths: {
    home: "http://192.168.119.129:8888",
    auth: "/auth",
    object_detection: "/objectDetection",
  },
  timeout: 5000,
  live_camera: {
    RESIZE_WIDTH: 152,
    RESIZE_HEIGHT: 200,
    RESIZE_DEPTH: 3,
  },
  timeBetweenTensorSaves: 10 * 1000, // 15 min in miliseconds
  distance_risk_margin: 0.2,
};

export default config;
