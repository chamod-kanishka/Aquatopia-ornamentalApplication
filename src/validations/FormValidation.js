let ValidationError = '';
let Result;

const EmailValidator = email => {
  const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,9}$/;
  if (email === '') {
    ValidationError = 'Email address required!';
  } else if (!emailRegex.test(email)) {
    ValidationError = 'Invalid email address!';
  } else {
    ValidationError = null;
  }
  return ValidationError;
};

const PasswordValidator = password => {
  if (password === '') {
    ValidationError = 'Password required!';
  } else if (password.length < 6) {
    ValidationError = 'Password must be at least 6 characters long!';
  } else {
    ValidationError = null;
  }
  return ValidationError;
};

const FullNameValidator = fullName => {
  const fullNameRegex = /^[A-Za-z]*[ ][A-Za-z]*$/;
  if (fullName === '') {
    ValidationError = 'Full name required!';
  } else if (!fullNameRegex.test(fullName)) {
    ValidationError = 'Invalid full name!';
  } else {
    ValidationError = null;
  }
  return ValidationError;
};

// Function to validate form inputs
const ValidateForm = form => {
  if (form.hasOwnProperty('fullName') && FullNameValidator(form.fullName)) {
    Result = FullNameValidator(form.fullName);
  } else if (
    form.hasOwnProperty('emailAddress') &&
    EmailValidator(form.emailAddress)
  ) {
    Result = EmailValidator(form.emailAddress);
  } else if (
    form.hasOwnProperty('password') &&
    PasswordValidator(form.password)
  ) {
    Result = PasswordValidator(form.password);
  } else {
    Result = null;
  }

  return Result;
};

export default ValidateForm;
