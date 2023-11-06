import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import App from "../src/App";
import GoogleSignin from "./__mocks__/@react-native-google-signin/google-signin";
import { render } from "@testing-library/react-native";

jest.mock("@react-native-async-storage/async-storage");
jest.mock("@appandflow/expo-camera-characteristics");
jest.mock("@react-native-firebase/auth");
jest.mock("@react-native-google-signin/google-signin");
jest.mock("@tensorflow/tfjs-react-native");

describe("App component", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON() as ReactTestRendererJSON;
    expect(tree?.children?.length).toBe(1);
  });

  it("configures GoogleSignIn", () => {
    render(<App />);
    expect(GoogleSignin.configure).toHaveBeenCalled();
  });
});
