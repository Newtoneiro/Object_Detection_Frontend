import React from "react";
import renderer, { ReactTestRenderer, act } from "react-test-renderer";
import { AuthProvider } from "../../../src/contexts/AuthContext";
import { AuthContext } from "../../../src/contexts/AuthContext";
import AsyncStorage from "../../__mocks__/@react-native-async-storage/async-storage";
import { when } from "jest-when";
import { queryText } from "../../jest.utils";
import axios from "axios";
import { globalConfig } from "../../../src/config";
import { IUserInputData } from "../../../src/contexts/AuthContext/AuthContext.types";

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

    it("Loads Context correctly", async () => {
      let tree;

      await act(async () => {
        tree = renderer.create(
          <AuthProvider>
            <AuthContext.Consumer>
              {(value) => {
                return (
                  <>
                    <h1>
                      {`Is authenticated: ${value.isAuthenticated?.toString()}`}
                    </h1>
                    <h1>{`token: ${
                      value.authState.token?.toString() || "null"
                    }`}</h1>
                    <h1>{`userInfo: ${JSON.stringify(
                      value.authState.userInfo
                    )}`}</h1>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (!tree) throw new Error("Tree is null");

      expect(queryText(tree, "Is authenticated: false").length).toBe(1);
      expect(queryText(tree, "token: null").length).toBe(1);
      expect(queryText(tree, "userInfo: {}").length).toBe(1);
    });

    it("Logins with email / password", async () => {
      when(axios.post)
        .calledWith(
          globalConfig.paths.home + globalConfig.paths.auth + "/verifyToken",
          {
            token: "FIREBASE-AUTH.getIdToken-verified-token",
          }
        )
        .mockResolvedValue({
          status: 200,
        });

      let tree: ReactTestRenderer | undefined;

      await act(async () => {
        tree = renderer.create(
          <AuthProvider>
            <AuthContext.Consumer>
              {(value) => {
                const loginInputData: IUserInputData = {
                  email: "a@b.c",
                  password: "123456",
                };
                return (
                  <>
                    <h1>
                      {`Is authenticated: ${value.isAuthenticated?.toString()}`}
                    </h1>
                    <h1>{`token: ${
                      value.authState.token?.toString() || "null"
                    }`}</h1>
                    <h1>{`userInfo: ${JSON.stringify(
                      value.authState.userInfo
                    )}`}</h1>
                    <button onClick={() => value.login(loginInputData)}>
                      LOGIN
                    </button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(queryText(tree, "Is authenticated: true").length).toBe(1);
      expect(
        queryText(tree, "token: FIREBASE-AUTH.getIdToken-verified-token").length
      ).toBe(1);
      expect(
        queryText(
          tree,
          `userInfo: ${JSON.stringify({
            email: "lo@gin.com",
            name: "Login name",
            uid: "123-login-uid",
            picture: null,
            isAnonymous: false,
            isByGoogleAuth: false,
          })}`
        ).length
      ).toBe(1);
    });
  });

  it("Registers with email / password", async () => {
    when(axios.post)
      .calledWith(
        globalConfig.paths.home + globalConfig.paths.auth + "/verifyToken",
        {
          token: "FIREBASE-AUTH.getIdToken-verified-token",
        }
      )
      .mockResolvedValue({
        status: 200,
      });

    let tree: ReactTestRenderer | undefined;

    await act(async () => {
      tree = renderer.create(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              const loginInputData: IUserInputData = {
                email: "a@b.c",
                password: "123456",
              };
              return (
                <>
                  <h1>
                    {`Is authenticated: ${value.isAuthenticated?.toString()}`}
                  </h1>
                  <h1>{`token: ${
                    value.authState.token?.toString() || "null"
                  }`}</h1>
                  <h1>{`userInfo: ${JSON.stringify(
                    value.authState.userInfo
                  )}`}</h1>
                  <button onClick={() => value.register(loginInputData)}>
                    LOGIN
                  </button>
                </>
              );
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );
    });

    if (tree === undefined) throw new Error("Tree is null");

    await act(
      async () => await tree?.root.findByType("button").props.onClick()
    );

    expect(queryText(tree, "Is authenticated: true").length).toBe(1);
    expect(
      queryText(tree, "token: FIREBASE-AUTH.getIdToken-verified-token").length
    ).toBe(1);
    expect(
      queryText(
        tree,
        `userInfo: ${JSON.stringify({
          email: "re@gister.com",
          name: "Registered name",
          uid: "123-register-uid",
          picture: null,
          isAnonymous: false,
          isByGoogleAuth: false,
        })}`
      ).length
    ).toBe(1);
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

    it("Loads Context correctly", async () => {
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
