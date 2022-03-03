export default function validatingSignupForm(credentials) {
  let errors = {};
  if (!credentials.name) {
    errors.name = "name required";
  }
  if (!credentials.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!credentials.password) {
    errors.password = "Password is required";
  } else if (credentials.password.length < 5) {
    errors.password = "Password needs to be 5 characters or more";
  }
  if (!credentials.cpassword) {
    errors.cpassword = "confirm password required";
  } else if (credentials.password != credentials.cpassword) {
    errors.cpassword = "Password should be same";
  }

  return errors;
}
