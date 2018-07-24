import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import User from '../../model/entity/client-user';

export default class UserService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 商品__实体
  readonly User: Repository<User>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.User = this.conn.getRepository(User);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 查询指定openid的用户
  async findByOpenid(openid: string): Promise<User> {
    try {
      return await this.User.findOne({ openid });
    } catch (err) {
      this.error(err);
    }
  }

  // - 插入新用户或者更新用户
  async updateUserData(userInfo: User): Promise<void> {
    try {
      await this.User.save(userInfo)
    } catch (err) {
      this.error(err);
    }
  }
}