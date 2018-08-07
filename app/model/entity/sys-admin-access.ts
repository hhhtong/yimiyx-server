/**
 * 后台管理系统-权限表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import AdminUser from './sys-admin-user'

@Entity()
export default class AdminAccess {
  @PrimaryGeneratedColumn()
  accessId: number

  /**
   * 用户
   */
  @ManyToMany(type => AdminUser, AU => AU.access)
  user: AdminUser[]

  /**
   * 权限名
   */
  @Column('varchar', { length: 64 })
  accessName: string

  /**
   * 父级ID
   */
  @Column()
  parentID: number

  /**
   * 权限描述
   */
  @Column('varchar', { length: 200, nullable: true })
  description: string

  /**
   * 权限类型
   * 1、超级管理员
   * 2、管理员
   * 3、店长
   * 4、仓库管理员
   * 5、采购员
   */
  @Column('tinyint', { default: 3 })
  accessType: number
}
