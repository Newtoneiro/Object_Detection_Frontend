const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn().mockResolvedValue(true),
  signIn: jest.fn().mockResolvedValue({
    idToken: "GOOGLE-SIGNIN.signIn-verified-token",
  }),
  revokeAccess: jest.fn(),
};

export { GoogleSignin };
