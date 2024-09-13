export const checkUserValidation = {
  username: {
    notEmpty: {
      errorMessage: "Username must not be empty",
    },
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: "Username must be between 3 and 32 characters long",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email must not be empty",
    },
    isEmail: {
      errorMessage: "Must be a valid e-mail address",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 characters long",
    },
  },
};
