import { Repository, SelectQueryBuilder } from 'typeorm';
import BaseService from '../../core/base-service';
import GoodsCategory from '../../model/entity/goods-category';
import { GoodsCategoryQuery, GoodsCategoryResult } from '../../common/query-interface';

export default class GoodsCategoryService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 商品分类__实体
  readonly GC: Repository<GoodsCategory>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.GC = this.conn.getRepository(GoodsCategory);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  async query({
    page = 1,
    rows = 20,
    name }: GoodsCategoryQuery): Promise<GoodsCategoryResult> {
    const where: string = name ? `category.name LIKE '%${name}%'` : '1 = 1';

    try {
      const query: SelectQueryBuilder<GoodsCategory> = await this.GC.createQueryBuilder('category');
      const list: GoodsCategory[] = await query
        .andWhere(`(${where} OR category.type != 1)`)
        .orderBy('category.no', 'DESC')
        // .skip((page - 1) * rows)
        // .take(rows)
        .getMany();
      const total: number = await query
        .andWhere(`(${where} AND category.type = 1)`)
        .getCount();
      const { idMax } = await query
        .andWhere(where)
        .select("MAX(id) AS idMax")
        .getRawOne();

      return { list, total, idMax: idMax };
    } catch (err) {
      this.error(err);
    }
  }

  async save(rowData: Partial<GoodsCategory>): Promise<void> {
    try {
      await this.GC.save(this.GC.create(rowData));
    } catch (err) {
      this.error(err);
    }
  }

  async delete(ids: number[]): Promise<void> {
    try {
      await this.GC.remove(await this.GC.findByIds(ids))
    } catch (err) {
      this.error(err);
    }
  }
}
