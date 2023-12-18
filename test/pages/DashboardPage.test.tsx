import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { DashboardPage } from "../../src/pages/DashboardPage";
import { when } from "jest-when";
import { IAuthContext } from "../../src/contexts/AuthContext";
import { ErrorContext, IErrorContext } from "../../src/contexts/ErrorContext";
import { Image } from "react-native";
import { AuthContext } from "../../src/contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

let realUseContext: any;
let useContextMock: any;

let mockAuthContest: IAuthContext = {
  isAuthenticated: true,
  authState: {
    token: "123",
    userInfo: {
      email: "bob@ross.ross",
      name: "Bob Ross",
      uid: "1",
      picture: null,
      isAnonymous: false,
      isByGoogleAuth: false,
    },
  },
  setAuthInfo: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
  login: jest.fn(),
  loginGoogle: jest.fn(),
  loginAnonymous: jest.fn(),
  resetPassword: jest.fn(),
};

let mockErrorContext: IErrorContext = {
  isVisible: false,
  message: null,
  severity: "error",
  displayError: jest.fn(),
  hideError: jest.fn(),
};

describe("[page] DashboardPage", () => {
  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();

    when(useContextMock)
      .calledWith(ErrorContext)
      .mockReturnValue(mockErrorContext);
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  it("Renders Image if Image in AuthState", () => {
    when(useContextMock)
      .calledWith(AuthContext)
      .mockReturnValue({
        ...mockAuthContest,
        authState: {
          ...mockAuthContest.authState,
          userInfo: { ...mockAuthContest.authState.userInfo, picture: "123" },
        },
      });

    let props: any; // To mock navigation prop

    const tree: any = createRenderer().render(<DashboardPage {...props} />);
    const image =
      tree.props.children.props.children[0].props.children[0].props.children
        .props.children;
    expect(image.type).toBe(Image);
    expect(image.props.source).toEqual({ uri: "123" });
  });

  it("Renders Default Icon if Image not in AuthState", () => {
    when(useContextMock)
      .calledWith(AuthContext)
      .mockReturnValue({
        ...mockAuthContest,
        authState: {
          ...mockAuthContest.authState,
          userInfo: { ...mockAuthContest.authState.userInfo, picture: null },
        },
      });

    let props: any; // To mock navigation prop

    const tree: any = createRenderer().render(<DashboardPage {...props} />);
    const image =
      tree.props.children.props.children[0].props.children[0].props.children
        .props.children;
    expect(image.type).toBe(FontAwesome);
    expect(image.props.name).toEqual("user-circle");
  });
});
