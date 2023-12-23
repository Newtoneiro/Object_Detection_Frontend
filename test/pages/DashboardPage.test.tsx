import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import {
  DashboardPage,
  dashboardPageStyles,
} from "../../src/pages/DashboardPage";
import { when } from "jest-when";
import { IAuthContext } from "../../src/contexts/AuthContext";
import { ErrorContext, IErrorContext } from "../../src/contexts/ErrorContext";
import { Image } from "react-native";
import { AuthContext } from "../../src/contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

let realUseContext: any;
let useContextMock: any;

const protectedPages = ["Your stats", "Live mode", "Friends"];
const unProtectedPages = ["Picture mode"];

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
  beforeAll(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();

    when(useContextMock)
      .calledWith(AuthContext)
      .mockReturnValue(mockAuthContest);

    when(useContextMock)
      .calledWith(ErrorContext)
      .mockReturnValue(mockErrorContext);
  });

  afterAll(() => {
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

  it("Some panels are protected", () => {
    let props: any; // To mock navigation prop

    const tree: any = createRenderer().render(<DashboardPage {...props} />);
    const gridItems = tree.props.children.props.children[1].props.children;

    gridItems.forEach((gridItem: any) => {
      if (protectedPages.includes(gridItem.props.name)) {
        expect(gridItem.props.isProtected).toBe(true);
      } else if (unProtectedPages.includes(gridItem.props.name)) {
        expect(gridItem.props.isProtected).toBe(false);
      }
    });
  });

  describe("User Anonymous", () => {
    beforeAll(() => {
      when(useContextMock)
        .calledWith(AuthContext)
        .mockReturnValue({
          ...mockAuthContest,
          authState: {
            ...mockAuthContest.authState,
            userInfo: {
              ...mockAuthContest.authState.userInfo,
              isAnonymous: true,
            },
          },
        });
    });

    it("Doesn't allow some panels if user is anonymous", () => {
      let props: any; // To mock navigation prop

      const tree = renderer
        .create(<DashboardPage {...props} />)
        .toJSON() as ReactTestRendererJSON;
      // @ts-ignore
      let gridItems = tree?.children[3].children[1].children[0];
      gridItems.children.forEach((gridItem: any) => {
        let name = gridItem.children[gridItem.children.length - 1].children[0]; // Get the Text
        if (protectedPages.includes(name)) {
          expect(gridItem.children.length).toBe(3); // Verify the blurring view is there
        } else if (unProtectedPages.includes(name)) {
          expect(gridItem.children.length).toBe(2);
        }
      });
    });

    it("Displays correct text if user is anonymous", () => {
      let props: any; // To mock navigation prop

      const tree = renderer
        .create(<DashboardPage {...props} />)
        .toJSON() as ReactTestRendererJSON;
      // @ts-ignore
      let accountDetails = tree?.children[3].children[0].children.slice(1, 3);
      expect(accountDetails[0].children[0]).toBe("Anonymous");
      expect(accountDetails[1].children[0]).toBe(
        "Register / Login to fully use the app."
      );
    });
  });

  describe("User not Anonymous", () => {
    beforeAll(() => {
      when(useContextMock)
        .calledWith(AuthContext)
        .mockReturnValue({
          ...mockAuthContest,
          authState: {
            ...mockAuthContest.authState,
            userInfo: {
              ...mockAuthContest.authState.userInfo,
              isAnonymous: false,
            },
          },
        });
    });

    it("Allows panels if user is not anonymous", () => {
      let props: any; // To mock navigation prop

      const tree = renderer
        .create(<DashboardPage {...props} />)
        .toJSON() as ReactTestRendererJSON;
      // @ts-ignore
      let gridItems = tree?.children[3].children[1].children[0].children;
      gridItems.forEach((gridItem: any) => {
        expect(gridItem.children.length).toBe(2);
      });
    });

    it("Displays correct text if user is not anonymous", () => {
      let props: any; // To mock navigation prop

      const tree = renderer
        .create(<DashboardPage {...props} />)
        .toJSON() as ReactTestRendererJSON;
      // @ts-ignore
      let accountDetails = tree?.children[3].children[0].children.slice(1, 3);
      expect(accountDetails[0].children[0]).toBe("Bob Ross");
      expect(accountDetails[1].children[0]).toBe("Welcome again!");
    });
  });
});
