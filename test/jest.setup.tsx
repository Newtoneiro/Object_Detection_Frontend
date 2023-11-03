// Mocking all the native modules
import "./__mocks__/@react-native-google-signin/google-signin";
import "./__mocks__/@react-native-firebase/auth";
import "./__mocks__/@react-native-async-storage/async-storage";
import "./__mocks__/@tensorflow/tfjs-react-native";
import "./__mocks__/@appandflow/expo-camera-characteristics";

// To avoid [ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.]
// mainly caused by animations library
jest.useFakeTimers();
