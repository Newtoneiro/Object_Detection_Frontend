import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { AuthGate } from "../../src/components/AuthGate";

let realUseContext: any;
let useContextMock: any;

describe("[component] AuthGate", () => {
  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  it("Renders the authenticated navigator when authenticated", () => {
    useContextMock.mockReturnValue({ isAuthenticated: true });
    const element: any = createRenderer().render(<AuthGate />);
    expect(element.type.name).toBe("Navigator");
  });

  it("Renders the unauthenticated navigator when unauthenticated", () => {
    useContextMock.mockReturnValue({ isAuthenticated: false });
    const element: any = createRenderer().render(<AuthGate />);
    expect(element.type.name).toBe("UnAuthNavigator");
  });
});
