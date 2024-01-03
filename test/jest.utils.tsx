import renderer from "react-test-renderer";

const queryText = (component: renderer.ReactTestRenderer, text: string) => {
  return component.root.findAll(
    (node) =>
      node.children.length === 1 &&
      typeof node.children[0] === "string" &&
      node.children[0] === text,
    { deep: true }
  );
};

export { queryText };
