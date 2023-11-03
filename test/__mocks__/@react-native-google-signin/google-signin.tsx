const GoogleSignin = {
  configure: () => {},
};

jest.mock("@react-native-google-signin/google-signin", () => {
  return {
    GoogleSignin,
  };
});
