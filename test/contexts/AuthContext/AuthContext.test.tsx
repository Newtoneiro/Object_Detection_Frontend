import React from "react";
import renderer, { act } from "react-test-renderer";
import { AuthProvider } from "../../../src/contexts/AuthContext";
import { AuthContext } from "../../../src/contexts/AuthContext";
import AsyncStorage from "../../__mocks__/@react-native-async-storage/async-storage";
import { when } from "jest-when";
import { queryText } from "../../jest.utils";
import axios from "axios";
import { globalConfig } from "../../../src/config";

jest.mock("axios");

const MOCK_TOKEN = "8fhaf721418as174ad";
const MOCK_USER_INFO = {
  email: "a@b.c",
  name: "abc",
  uid: "123",
  picture: null,
  isAnonymous: false,
  isByGoogleAuth: true,
};

describe("[context] AuthContext", () => {
  describe("First Time login", () => {
    beforeAll(() => {
      when(AsyncStorage.getItem).calledWith("token").mockResolvedValue(null);
      when(AsyncStorage.getItem).calledWith("userInfo").mockResolvedValue(null);
    });

    it("Renders", async () => {
      let tree;

      await act(async () => {
        tree = renderer.create(
          <AuthProvider>
            <AuthContext.Consumer>
              {(value) => (
                <span>
                  {`Is authenticated: ${value.isAuthenticated?.toString()}`}
                </span>
              )}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (!tree) throw new Error("Tree is null");

      expect(queryText(tree, "Is authenticated: false").length).toBe(1);
    });
  });

  describe("Data in Local Storage", () => {
    beforeAll(() => {
      when(AsyncStorage.getItem)
        .calledWith("token")
        .mockResolvedValue(MOCK_TOKEN);
      when(AsyncStorage.getItem)
        .calledWith("userInfo")
        .mockResolvedValue(JSON.stringify(MOCK_USER_INFO));

      when(axios.post)
        .calledWith(
          globalConfig.paths.home + globalConfig.paths.auth + "/verifyToken",
          {
            token: MOCK_TOKEN,
          }
        )
        .mockResolvedValue({
          status: 200,
        });
    });

    it("Renders", async () => {
      let tree;

      await act(async () => {
        tree = renderer.create(
          <AuthProvider>
            <AuthContext.Consumer>
              {(value) => (
                <span>
                  {`Is authenticated: ${value.isAuthenticated?.toString()}`}
                </span>
              )}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (!tree) throw new Error("Tree is null");

      expect(queryText(tree, "Is authenticated: true").length).toBe(1);
    });
  });
});
