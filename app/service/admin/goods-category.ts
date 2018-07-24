import { Repository, SelectQueryBuilder } from 'typeorm';
import BaseService from '../../core/base-service';
import GoodsCategory from '../../model/entity/goods-category';
import { Query } from '../../common/query-interface';

interface IQuery extends Query {
  name?: string
}

type IQueryResult<T> = {
  list: T[],
  total: number,
  idMax?: number
} | T[] | T

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
    name }: IQuery): Promise<IQueryResult<GoodsCategory>> {
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
    } catch (error) {
      this.error(error);
    }
  }

  async save(rowData: GoodsCategory): Promise<void> {
    try {
      await this.GC.save(rowData);
    } catch (error) {
      this.error(error);
    }
  }

  async delete(ids: number[]): Promise<void> {
    try {
      await this.GC.remove(await this.GC.findByIds(ids))
    } catch (error) {
      this.error(error);
    }
  }
}
