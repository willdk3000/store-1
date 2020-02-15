module.exports = (req, res, next) => {

  console.log('Credits left :', req.session.passport.user.credits)

  if (req.session.passport.user.credits < 1) {
    res.status(403).send({ error: 'Not enough credits!' });
  }

  next();

}