const cameraWithTensors = () => {
  return <></>;
};

jest.mock("@tensorflow/tfjs-react-native", () => {
  return { cameraWithTensors };
});
