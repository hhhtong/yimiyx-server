/**
 * 后台管理系统-用户表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class SysAdminUser {

  @PrimaryGeneratedColumn()
  id: number

  /**
   * 用户名
   */
  @Column('varchar', { length: 100, unique: true })
  userName: string

  /**
   * 密码
   */
  @Column('char', { length: 120 })
  password: string

  /**
   * 手机号
   */
  @Column('char', { length: 11, default: '' })
  tel: string

  /**
   * 是否禁用
   * 0: 可用
   * 1: 禁用
   */
  @Column('tinyint', { default: 0 })
  isDisable: number

  /**
   * 部门
   */
  @Column()
  departmentName: string

  /**
   * 角色
   */
  @Column('varchar', { length: 32 })
  roleName: string

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
