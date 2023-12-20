export let module = {
  signInWithEmailAndPassword: jest.fn().mockResolvedValue({
    additionalUserInfo: {
      providerId: "email",
    },
    user: {
      displayName: "Login name",
      email: "lo@gin.com",
      uid: "123-login-uid",
      isAnonymous: false,
      photoURL: null,
    },
  }),
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
    additionalUserInfo: {
      providerId: "email",
    },
    user: {
      displayName: "Registered name",
      email: "re@gister.com",
      uid: "123-register-uid",
      isAnonymous: false,
      photoURL: null,
    },
  }),
  currentUser: {
    getIdToken: jest
      .fn()
      .mockResolvedValue("FIREBASE-AUTH.getIdToken-verified-token"),
  },
};

const auth = jest.fn().mockReturnValue(module);

export const FirebaseAuthTypes = {};

export default auth;
