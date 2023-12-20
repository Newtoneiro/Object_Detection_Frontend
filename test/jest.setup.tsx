import React from "react";

// Mock the native modules
jest.mock("@react-native-async-storage/async-storage");
jest.mock("@appandflow/expo-camera-characteristics");
jest.mock("@react-native-firebase/auth");
jest.mock("@react-native-google-signin/google-signin");
jest.mock("@tensorflow/tfjs-react-native");
jest.mock("axios");

jest.mock("expo-font");
jest.mock("expo-asset");

// To avoid [ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.]
// mainly caused by animations library
jest.useFakeTimers();

// To trigger the UseEffect hook

// 'The signature is identical to useEffect, but it fires synchronously after all DOM mutations.
// Use this to read layout from the DOM and synchronously re-render.
// Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.'
jest.spyOn(React, "useEffect").mockImplementation(React.useLayoutEffect);
