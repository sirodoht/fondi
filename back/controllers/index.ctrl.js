module.exports = indexCtrl = {};

indexCtrl.default = function(req, res, next) {

  res.render('index', {
    title: 'Fondi'
  });
  // next();
};
