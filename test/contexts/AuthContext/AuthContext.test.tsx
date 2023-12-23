import axios from "axios";
import { when } from "jest-when";
import React from "react";
import renderer, { ReactTestRenderer, act } from "react-test-renderer";
import { globalConfig } from "../../../src/config";
import { AuthContext, AuthProvider } from "../../../src/contexts/AuthContext";
import { IUserInputData } from "../../../src/contexts/AuthContext/AuthContext.types";
import { LoadingContext } from "../../../src/contexts/LoadingContext";
import AsyncStorage from "../../__mocks__/@react-native-async-storage/async-storage";
import auth from "../../__mocks__/@react-native-firebase/auth";
import { GoogleSignin } from "../../__mocks__/@react-native-google-signin/google-signin";
import { queryText } from "../../jest.utils";

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

let realUseContext: any;
let useContextMock: any;

const mockLoadingCon = {
  setLoading: jest.fn(),
  setDisplayLoadingCard: jest.fn(),
  setLoadingCardText: jest.fn(),
};

describe("[context] AuthContext", () => {
  beforeAll(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();

    when(useContextMock)
      .calledWith(LoadingContext)
      .mockReturnValue(mockLoadingCon);
  });

  afterAll(() => {
    React.useContext = realUseContext;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(2);
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        1,
        true
      );
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        2,
        false
      );
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(1);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledWith(
        "Logging you in"
      );

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "userInfo",
        JSON.stringify({
          email: "lo@gin.com",
          name: "Login name",
          uid: "123-login-uid",
          picture: null,
          isAnonymous: false,
          isByGoogleAuth: false,
        })
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "token",
        "FIREBASE-AUTH.getIdToken-verified-token"
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

    it("Logins with email / password - failed", async () => {
      auth.mockReturnValueOnce({
        signInWithEmailAndPassword: jest.fn().mockImplementationOnce(() => {
          throw {
            code: "auth/wrong-password",
            message:
              "The password is invalid or the user does not have a password.",
            name: "FirebaseError",
          };
        }),
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

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(0);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(0);

      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(0);

      expect(queryText(tree, "Is authenticated: false").length).toBe(1);
      expect(queryText(tree, "token: null").length).toBe(1);
      expect(queryText(tree, "userInfo: {}").length).toBe(1);
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
                      REGISTER
                    </button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(2);
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        1,
        true
      );
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        2,
        false
      );
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(1);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledWith(
        "Logging you in"
      );

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "userInfo",
        JSON.stringify({
          email: "re@gister.com",
          name: "Registered name",
          uid: "123-register-uid",
          picture: null,
          isAnonymous: false,
          isByGoogleAuth: false,
        })
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "token",
        "FIREBASE-AUTH.getIdToken-verified-token"
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

    it("Registers with email / password - failed", async () => {
      auth.mockReturnValueOnce({
        createUserWithEmailAndPassword: jest.fn().mockImplementationOnce(() => {
          throw {
            code: "auth/email-already-in-use",
            message: "The email address is already in use by another account.",
            name: "FirebaseError",
          };
        }),
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
                      REGISTER
                    </button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(0);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(0);

      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(0);

      expect(queryText(tree, "Is authenticated: false").length).toBe(1);
      expect(queryText(tree, "token: null").length).toBe(1);
      expect(queryText(tree, "userInfo: {}").length).toBe(1);
    });

    it("Registers / Logins with google", async () => {
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
                    <button onClick={() => value.loginGoogle()}>
                      LOGIN with google
                    </button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(2);
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        1,
        true
      );
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        2,
        false
      );
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(1);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledWith(
        "Logging you in"
      );

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "userInfo",
        JSON.stringify({
          email: "go@ogle.com",
          name: "Google name",
          uid: "123-google-uid",
          picture: null,
          isAnonymous: false,
          isByGoogleAuth: true,
        })
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "token",
        "FIREBASE-AUTH.getIdToken-verified-token"
      );

      expect(queryText(tree, "Is authenticated: true").length).toBe(1);
      expect(
        queryText(tree, "token: FIREBASE-AUTH.getIdToken-verified-token").length
      ).toBe(1);
      expect(
        queryText(
          tree,
          `userInfo: ${JSON.stringify({
            email: "go@ogle.com",
            name: "Google name",
            uid: "123-google-uid",
            picture: null,
            isAnonymous: false,
            isByGoogleAuth: true,
          })}`
        ).length
      ).toBe(1);
    });

    it("Registers / Logins with google - services unavailable", async () => {
      auth.mockReturnValueOnce({
        GoogleSignin: {
          hasPlayServices: jest.fn().mockResolvedValueOnce(false),
        },
      });

      let tree: ReactTestRenderer | undefined;

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
                    <button onClick={() => value.loginGoogle()}>
                      LOGIN with google
                    </button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(0);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(0);

      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(0);

      expect(queryText(tree, "Is authenticated: false").length).toBe(1);
      expect(queryText(tree, "token: null").length).toBe(1);
      expect(queryText(tree, "userInfo: {}").length).toBe(1);
    });

    it("Registers / Logins with google - failed", async () => {
      auth.mockReturnValueOnce({
        signInWithCredential: jest.fn().mockImplementationOnce(() => {
          throw {
            code: "auth/invalid-credential",
            message:
              "The supplied auth credential is malformed or has expired.",
            name: "FirebaseError",
          };
        }),
        GoogleSignin: {
          hasPlayServices: jest.fn().mockResolvedValueOnce(true),
        },
      });

      let tree: ReactTestRenderer | undefined;

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
                    <button onClick={() => value.loginGoogle()}>
                      LOGIN with google
                    </button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(0);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(0);

      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(0);

      expect(queryText(tree, "Is authenticated: false").length).toBe(1);
      expect(queryText(tree, "token: null").length).toBe(1);
      expect(queryText(tree, "userInfo: {}").length).toBe(1);
    });

    it("Logins anonymously", async () => {
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
                    <button onClick={() => value.loginAnonymous()}>
                      LOGIN anonymous
                    </button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(2);
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        1,
        true
      );
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        2,
        false
      );
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(1);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledWith(
        "Logging you in"
      );

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "userInfo",
        JSON.stringify({
          email: null,
          name: null,
          uid: "123-anonymous-uid",
          picture: null,
          isAnonymous: true,
          isByGoogleAuth: false,
        })
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "token",
        "FIREBASE-AUTH.getIdToken-verified-token"
      );

      expect(queryText(tree, "Is authenticated: true").length).toBe(1);
      expect(
        queryText(tree, "token: FIREBASE-AUTH.getIdToken-verified-token").length
      ).toBe(1);
      expect(
        queryText(
          tree,
          `userInfo: ${JSON.stringify({
            email: null,
            name: null,
            uid: "123-anonymous-uid",
            picture: null,
            isAnonymous: true,
            isByGoogleAuth: false,
          })}`
        ).length
      ).toBe(1);
    });

    it("Logins anonymously - failed", async () => {
      auth.mockReturnValueOnce({
        signInAnonymously: jest.fn().mockImplementationOnce(() => {
          throw {
            code: "auth/server-rejected",
            message:
              "The credential used to authenticate this SDK does not have permission to access the Firebase Authentication backend.",
            name: "FirebaseError",
          };
        }),
      });

      let tree: ReactTestRenderer | undefined;

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
                    <button onClick={() => value.loginAnonymous()}>
                      LOGIN anonymous
                    </button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(0);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(0);

      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(0);

      expect(queryText(tree, "Is authenticated: false").length).toBe(1);
      expect(queryText(tree, "token: null").length).toBe(1);
      expect(queryText(tree, "userInfo: {}").length).toBe(1);
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

      if (tree === undefined) throw new Error("Tree is null");

      expect(queryText(tree, "Is authenticated: true").length).toBe(1);
    });

    it("Logins automatically", async () => {
      let tree: ReactTestRenderer | undefined;

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

      if (tree === undefined) throw new Error("Tree is null");

      expect(queryText(tree, "Is authenticated: true").length).toBe(1);
      expect(queryText(tree, `token: ${MOCK_TOKEN}`).length).toBe(1);
      expect(
        queryText(tree, `userInfo: ${JSON.stringify(MOCK_USER_INFO)}`).length
      ).toBe(1);
    });

    it("Logs out", async () => {
      let tree: ReactTestRenderer | undefined;

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
                    <button onClick={() => value.logout()}>LOGOUT</button>
                  </>
                );
              }}
            </AuthContext.Consumer>
          </AuthProvider>
        );
      });

      if (tree === undefined) throw new Error("Tree is null");

      jest.clearAllMocks();

      await act(
        async () => await tree?.root.findByType("button").props.onClick()
      );

      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenCalledTimes(4);
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        // logout
        1,
        true
      );
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        // check token
        2,
        true
      );
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        // check token
        3,
        false
      );
      expect(mockLoadingCon.setDisplayLoadingCard).toHaveBeenNthCalledWith(
        // logout
        4,
        false
      );
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledTimes(2);
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledWith(
        // logout
        "Signing out"
      );
      expect(mockLoadingCon.setLoadingCardText).toHaveBeenCalledWith(
        // check token
        "Logging you in"
      );

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("token");
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("userInfo");
      expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(2);

      expect(GoogleSignin.revokeAccess).toHaveBeenCalledTimes(1);

      expect(auth().signOut).toHaveBeenCalledTimes(1);

      expect(queryText(tree, "Is authenticated: false").length).toBe(1);
      expect(queryText(tree, "token: null").length).toBe(1);
      expect(queryText(tree, "userInfo: null").length).toBe(1);
    });
  });
});
