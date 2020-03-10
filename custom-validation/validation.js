function passwordValidation(password, password_confirmation){
    // create function to validate password
  const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

  //validate password and password confirmation before encrypting it
  if (password !== password_confirmation)
    return "Passwords don't match."
  if (!mediumRegex.test(password))
    return "Password is too week."

    else return null

}

module.exports.passwordValidation = passwordValidation