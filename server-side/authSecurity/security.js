const security = (request, response) => {
  let auth = {
    authenticated: false
  };

  if(request.session && request.session.userId) {
    // Session is Validated against the secret
    // Session is not expired
    // Session User is logged in
    auth.authenticated = true;
    auth.userId = request.session.userId;
    auth.authorisation = request.session.authorisation;
  }

  // Setting auth in response headers
  // This data is going to be used on the front for authorisation
  response.set('auth', JSON.stringify(auth));

  return {request, response, auth};
};

module.exports = { security };