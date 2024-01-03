export let mock_module = {
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
  signInWithCredential: jest.fn().mockResolvedValue({
    additionalUserInfo: {
      providerId: "google.com",
    },
    user: {
      displayName: "Google name",
      email: "go@ogle.com",
      uid: "123-google-uid",
      isAnonymous: false,
      photoURL: null,
    },
  }),
  signInAnonymously: jest.fn().mockResolvedValue({
    additionalUserInfo: {
      providerId: "anonymous",
    },
    user: {
      displayName: null,
      email: null,
      uid: "123-anonymous-uid",
      isAnonymous: true,
      photoURL: null,
    },
  }),
  signOut: jest.fn(),
  currentUser: {
    getIdToken: jest
      .fn()
      .mockResolvedValue("FIREBASE-AUTH.getIdToken-verified-token"),
  },
};

const auth = jest.fn().mockReturnValue(mock_module);

// @ts-ignore
auth.GoogleAuthProvider = {
  credential: jest.fn().mockReturnValue({
    providerId: "google.com",
    token: "FIREBASE-AUTH.GoogleAuthProvider-credential-verified-token",
    secret: "FIREBASE-AUTH.GoogleAuthProvider-credential-verified-secret",
  }),
};

export const FirebaseAuthTypes = {};

export default auth;
