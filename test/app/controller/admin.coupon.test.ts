import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('app/controller/admin/coupon.ts', () => {
  it('should GET /', async () => {
    let { text } = await app.httpRequest().get('/coupon').expect(200);
    text = JSON.parse(text);
    assert(text.code === 50000);
  });
});
