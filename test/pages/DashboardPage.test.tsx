import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { DashboardPage } from "../../src/pages/DashboardPage";
import { when } from "jest-when";
import { AuthContext } from "../../src/contexts/AuthContext";
import { ErrorContext } from "../../src/contexts/ErrorContext";

let realUseContext: any;
let useContextMock: any;

describe("[page] DashboardPage", () => {
  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  it("Renders correctly when user is not anonymous", () => {
    when(useContextMock)
      .calledWith(AuthContext)
      .mockReturnValue({
        isAuthenticated: true,
        authState: {
          token: "123",
          userInfo: {
            email: "bob@ross.ross",
            name: "Bob Ross",
            uid: 1,
            picture: null,
            isAnonymous: false,
            isByGoogleAuth: false,
          },
        },
      });

    when(useContextMock).calledWith(ErrorContext).mockReturnValue({
      error: null,
      setError: jest.fn(),
    });
    let props: any; // To mock navigation prop

    const element: any = createRenderer().render(<DashboardPage {...props} />);
    console.log(element.props.children);
  });
});
