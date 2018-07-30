import BaseController from '../../core/base-controller';
import { SupplierQuery, SupplierResult, SupplierPartial } from '../../common/QueryInterface';

export default class SupplierController extends BaseController {

  async index(): Promise<void> {
    const query: SupplierQuery = this.ctx.query;
    try {
      const result: SupplierResult = await this.service.admin.supplier.query(query);
      result.list.forEach(item => this.$sqlDateFormat(item, 'createdAt'));
      this.success(result);
    } catch (err) {
      this.fail(err);
    }
  }

  async add(): Promise<void> {
    const raw: SupplierQuery = this.ctx.request.body;
    const categoryID: number = raw.categoryID;
    try {
      await this.service.admin.supplier.insert(raw, categoryID);
      this.success();
    } catch (err) {
      this.fail(err);
    }
  }

  async delete(): Promise<void> {
    const params: SupplierPartial = this.ctx.request.body;
    try {
      await this.service.admin.supplier.delete(params);
      this.success();
    } catch (err) {
      this.fail(err);
    }
  }

  async update(): Promise<void> {
    const params: SupplierPartial = this.ctx.request.body;
    try {
      await this.service.admin.supplier.update(params);
      this.success();
    } catch (err) {
      this.fail(err);
    }
  }
}
