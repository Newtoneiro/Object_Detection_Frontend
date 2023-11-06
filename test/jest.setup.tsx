// To avoid [ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.]
// mainly caused by animations library
jest.useFakeTimers();
