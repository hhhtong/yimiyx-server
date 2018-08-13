import { Repository } from 'typeorm'
import BaseService from '../../core/base-service'
import User from '../../model/entity/user'

export default class UserService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - User entity
  readonly user: Repository<User>

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx)
    this.user = this.conn.getRepository(User)
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 查询指定openid的用户
  async findByOpenid(openid: string): Promise<User | undefined> {
    try {
      return await this.user.findOne({ openid })
    } catch (err) {
      this.error(err)
    }
  }

  // - 添加新用户
  async insertNewUser(userInfo: Partial<User>): Promise<void> {
    try {
      await this.user.save(userInfo)
    } catch (err) {
      this.error(err)
    }
  }
}
