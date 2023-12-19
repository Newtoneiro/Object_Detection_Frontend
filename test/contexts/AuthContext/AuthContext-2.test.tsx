import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AuthProvider } from "../../../src/contexts/AuthContext";
import { AuthContext } from "../../../src/contexts/AuthContext";
import AsyncStorage from "../../__mocks__/@react-native-async-storage/async-storage";
import { when } from "jest-when";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

xdescribe("[context] AuthContext - credentials in local storage", () => {
  beforeAll(() => {
    when(AsyncStorage.getItem)
      .calledWith("token")
      .mockResolvedValue("8fhaf721418as174ad");
    when(AsyncStorage.getItem)
      .calledWith("userInfo")
      .mockResolvedValue(
        JSON.stringify({
          email: "a@b.c",
          name: "abc",
          uid: "123",
          picture: null,
          isAnonymous: false,
          isByGoogleAuth: true,
        })
      );

    mockedAxios.post.mockResolvedValue({
      status: 200,
    });
  });

  afterAll(() => {
    AsyncStorage.getItem.mockClear();
  });

  it("Renders", () => {
    const TestComponent = () => {
      const AuthCon = React.useContext(AuthContext);
      expect(AuthCon).toBeDefined();
      expect(AuthCon.isAuthenticated).toBe(true);
      expect(AuthCon.authState.token).toBe("token");
      expect(AuthCon.authState.userInfo).toBe({
        email: "a@b.c",
        name: "abc",
        uid: "123",
        picture: null,
        isAnonymous: false,
        isByGoogleAuth: true,
      });

      return <></>;
    };

    const tree = renderer
      .create(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )
      .toJSON() as ReactTestRendererJSON;
  });
});
