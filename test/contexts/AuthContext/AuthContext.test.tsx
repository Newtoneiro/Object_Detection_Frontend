import React from "react";
import renderer, { act } from "react-test-renderer";
import { AuthProvider } from "../../../src/contexts/AuthContext";
import { AuthContext } from "../../../src/contexts/AuthContext";
import AsyncStorage from "../../__mocks__/@react-native-async-storage/async-storage";
import auth from "../../__mocks__/@react-native-firebase/auth";
import { when } from "jest-when";

jest.mock("@react-native-firebase/auth");

describe("[context] AuthContext - first time login", () => {
  beforeAll(() => {
    when(AsyncStorage.getItem).calledWith("token").mockResolvedValue(null);
    when(AsyncStorage.getItem).calledWith("userInfo").mockResolvedValue(null);
  });

  afterAll(() => {
    AsyncStorage.getItem.mockClear();
  });

  it("Renders", () => {
    const TestComponent = () => {
      const AuthCon = React.useContext(AuthContext);
      expect(AuthCon).toBeDefined();
      expect(AuthCon.isAuthenticated).toBeFalsy();
      expect(AuthCon.authState.token).toBeNull();
      expect(AuthCon.authState.userInfo).toBeNull();

      return <></>;
    };

    const tree = renderer.create(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  xit("Logs in", () => {
    when(auth.auth.signInWithEmailAndPassword)
      .calledWith("email", "password")
      .mockImplementationOnce(() => {
        console.log("mocked");
      });

    const TestComponent = () => {
      const AuthCon = React.useContext(AuthContext);

      return <></>;
    };

    const tree = renderer.create(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });
});
