const routes_validation = (req,res,next) => {
  if (!req.session.user) {
    return res.redirect('/');
  };
  next();
};
module.exports = routes_validation;
