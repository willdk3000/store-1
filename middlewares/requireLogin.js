module.exports = (req, res, next) => {
  try {
    if (req.session.passport.user) {
      next();
    }
  }
  catch {
    res.status(401).send({ error: 'No user logged in' });
  }
}