// Mock the native modules
jest.mock("@react-native-async-storage/async-storage");
jest.mock("@appandflow/expo-camera-characteristics");
jest.mock("@react-native-firebase/auth");
jest.mock("@react-native-google-signin/google-signin");
jest.mock("@tensorflow/tfjs-react-native");

jest.mock("expo-font");
jest.mock("expo-asset");

// To avoid [ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.]
// mainly caused by animations library
jest.useFakeTimers();
