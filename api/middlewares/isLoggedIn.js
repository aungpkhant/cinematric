async function isLoggedIn(request, reply) {
  try {
    const { userId, isLoggedIn } = request.session.user;

    if (isLoggedIn) {
      request.user = userId;
    }
  } catch (error) {
    reply.unauthorized();
  }
}

module.exports = {
  isLoggedIn,
};
