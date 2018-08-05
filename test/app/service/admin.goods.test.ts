import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('app/service/admin/goods.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('goods.queryAll', async () => {
    const { list, total } = await ctx.service.admin.goods.queryAll({});
    assert(Array.isArray(list));
    assert(typeof total === 'number');
  });
});
