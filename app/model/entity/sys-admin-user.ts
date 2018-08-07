/**
 * 后台管理系统-用户表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import AdminDepartment from './sys-admin-department'
import AdminAccess from './sys-admin-access'
import AdminRole from './sys-admin-role'
import AdminLog from './sys-admin-log'

@Entity()
export default class AdminUser {

  @PrimaryGeneratedColumn()
  userId: number

  /**
   * 用户所在部门
   */
  @ManyToMany(type => AdminDepartment, AD => AD.user)
  @JoinTable()
  department: AdminDepartment[]

  /**
   * 用户所拥有权限
   */
  @ManyToMany(type => AdminAccess, AD => AD.user)
  @JoinTable()
  access: AdminAccess[]

  /**
   * 用户的角色
   */
  @ManyToMany(type => AdminRole, AD => AD.user)
  @JoinTable()
  role: AdminRole[]

  /**
   * 操作日志
   */
  @OneToMany(type => AdminLog, AL => AL.user)
  logs: AdminLog[]

  /**
   * 用户名 - 登录账号
   */
  @Column('varchar', { length: 64, unique: true })
  loginName: string

  /**
   * 密码
   */
  @Column('varchar', { length: 100 })
  password: string

  /**
   * 姓名
   */
  @Column('varchar', { length: 64, nullable: true })
  userName: string

  /**
   * 头像
   */
  @Column('varchar', { length: 100, nullable: true })
  avator: string

  /**
   * 电子邮箱
   */
  @Column('varchar', { length: 20, nullable: true })
  tel: string

  /**
   * 电子邮箱
   */
  @Column('varchar', { length: 64, nullable: true })
  email: string

  /**
   * 登录次数
   */
  @Column('int', { default: 0 })
  count: number

  /**
   * 是否禁用
   * 0: 可用
   * 1: 禁用
   */
  @Column('tinyint', { default: 0 })
  isDisable: number

  /**
   * 登录时间
   */
  @Column({ nullable: true })
  loginTime: Date

  /**
   * 最后一次登录时间
   */
  @Column({ nullable: true })
  lastLoginTime: Date

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date

  /**
   * 删除时间
   */
  @Column({ nullable: true })
  deletedAt: Date
}
