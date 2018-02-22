module.exports = app => {

  return class HomeController extends app.Controller {

    async index() {
      const { ctx } = this;
      await ctx.render('app/app.js', { message: 'server render' });
    }

    async client() {
      const { ctx } = this;
      await ctx.renderClient('app/app.js', { message: 'client render' });
    }

    // async pager() {
    //   const { ctx } = this;
    //   const pageIndex = ctx.query.pageIndex;
    //   const pageSize = ctx.query.pageSize;
    //   ctx.body = Model.getPage(pageIndex, pageSize);
    // }

  };
};