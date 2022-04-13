const AuthParser = errorCode => {
  switch (errorCode) {
    case 'successfulLogin':
      return 'You have successfully logged in.';

    case 'auth/invalid-email':
      return 'Email not found.';

    case 'auth/wrong-password':
      return 'Wrong Password';

    case 'auth/user-not-found':
      return 'User Not Found ';

    case 'auth/email-already-in-use':
      return 'Email already in use.';

    default:
      return errorCode;
  }
};

export default AuthParser;
