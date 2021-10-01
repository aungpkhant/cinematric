async function isLoggedIn(request, reply) {
  try {
    const { userId, isLoggedIn } = request.session.user;

    if (isLoggedIn) {
      request.user = userId;
    }
  } catch (error) {
    // TODO proper error code with sensible
    throw new Error("Must be logged in to access this resource");
  }
}

module.exports = {
  isLoggedIn,
};
