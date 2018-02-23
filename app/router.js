
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/server', app.controller.home.server);
};
