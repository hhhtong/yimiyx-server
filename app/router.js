
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/client', app.controller.home.client);
};
