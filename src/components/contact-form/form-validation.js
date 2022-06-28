export const handleValidation = (fields, errors, setErrors) => {
  let noErrors = true;
  console.log(fields["subject"]);

  const setError = (field, msg) => {
    errors[field] = msg;
    noErrors = false;
  };
  if (!fields["firstname"]) {
    setError("firstname", "Please enter your first name.");
  } else if (!fields["firstname"].match(/^[a-zA-Z]+$/)) {
    setError("firstname", "First name must only contain letters.");
  }
  if (!fields["lastname"]) {
    setError("lastname", "Please enter your last name.");
  } else if (!fields["lastname"].match(/^[a-zA-Z]+$/)) {
    setError("lastname", "Last name must only contain letters.");
  }
  if (!fields["email"]) {
    setError("email", "Please enter your email address.");
  } else if (!fields["email"].match(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
    setError("email", "Email address is not valid.");
  }
  if (
    fields["subject"] === undefined ||
    fields["subject"] === "--- Please choose an option ---"
  ) {
    setError("subject", "Subject is required.");
  }
  if (!fields["message"]) {
    setError("message", "Message is required.");
  }
  if (noErrors === false) {
    setErrors({ ...errors });
  }
  return noErrors;
};
