var indexCtrl = module.exports = {};

indexCtrl.getIndex = function (req, res) {
  res.render('index', {
    title: 'Fondi',
  });
};
