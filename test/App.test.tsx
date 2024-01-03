import React from "react";
import renderer, { ReactTestRenderer, act } from "react-test-renderer";
import { App } from "../src/App";

describe("App component", () => {
  it("renders correctly", async () => {
    let component: ReactTestRenderer;

    await act(async () => {
      component = renderer.create(<App />);
    });

    expect(component!.root.children.length).toBe(1);
  });
});
