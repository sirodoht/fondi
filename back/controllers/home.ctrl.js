module.exports = homeCtrl = {};

homeCtrl.default = function(req, res, next) {
  res.render('index', {
    title: 'Nouson Bright'
  });
  // next();
};
