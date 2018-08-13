import { Repository, SelectQueryBuilder } from 'typeorm'
import BaseService from '../../core/base-service'
// import Access from '../../model/entity/sys-admin-access'
// import Department from '../../model/entity/sys-admin-department'
// import Log from '../../model/entity/sys-admin-log'
// import Role from '../../model/entity/sys-admin-role'
import User from '../../model/entity/sys-admin-user'
import { AdminUserQuery } from '../../common/QueryInterface'

export default class UserService extends BaseService {
  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - User entity
  readonly user: Repository<User>

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor (ctx) {
    super(ctx)
    this.user = this.conn.getRepository(User)
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  async find ({
    page = 1,
    rows = 20,
    roleId = 0,
    userName = ''
  }: AdminUserQuery): Promise<[User[], number]> {
    let query: SelectQueryBuilder<User> = this.user
      .createQueryBuilder('U')
      .leftJoinAndSelect('U.role', 'R')
      .where('ISNULL(U.deletedAt)')
      .addSelect(
        subQuery => subQuery.select('COUNT(U.userId)').from(User, 'U'),
        'total'
      )
    // .skip((page - 1) * rows)
    // .take(rows)

    if (roleId !== 0) {
      query = query.andWhere('U.role = :role', { roleId })
    }
    if (userName !== '') {
      query = query.andWhere('U.loginName = :userName', { userName })
    }

    return await query.getManyAndCount()
  }

  async save (raw: Partial<User>): Promise<boolean> {
    try {
      await this.user.save(this.user.create(raw))
      return true
    } catch (err) {
      this.error(err)
      return false
    }
  }

  async remove (userId: number): Promise<boolean> {
    try {
      await this.user.delete(userId)
      return true
    } catch (err) {
      return false
    }
  }

  async findUserById (userId: number) {

  }

  // - 登录的时候调用，获取要登录的用户信息
  async findUserByName (user: number | string, password: string, verifyPswd: boolean): Promise<{ userInfo, code }> {
    let code: string = 'ok'
    let userInfo: User | undefined
    let query = this.user
      .createQueryBuilder('U')
      .where(typeof user === 'number' ? 'userId = :user' : 'userName = :user', { user })

    userInfo = await query
      .select([
        'userId',
        'loginName',
        'password',
        'userName',
        'avator',
        'tel',
        'email',
        'count',
        'isDisable',
        'loginTime',
        'lastLoginTime'
      ])
      .getOne()

    if (!userInfo) {
      code = 'account_unknown' // - 账户不存在
    } else if (verifyPswd && userInfo.password !== password) {
      code = 'password_err' // - 密码错误
    } else if (userInfo.isDisable === 1) {
      code = 'account_disable' // - 账户被禁用
    } else {
      delete userInfo.password
    }

    return { userInfo, code }
  }
}
