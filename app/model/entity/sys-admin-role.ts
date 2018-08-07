/**
 * 后台管理系统-角色表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm'
import AdminUser from './sys-admin-user'

@Entity()
export default class AdminRole {
  /**
   * 角色类型
   * - 超级管理员
   * - 管理员
   * - 店长
   * - 仓库管理员
   * - 采购员
   */
  @PrimaryGeneratedColumn()
  roleId: number

  /**
   * 角色下对应的用户
   */
  @ManyToMany(type => AdminUser, AU => AU.role)
  user: AdminUser[]

  /**
   * 角色名
   */
  @Column('varchar', { length: 64 })
  roleName: string

  /**
   * 父级ID
   */
  @Column()
  parentID: number

  /**
   * 角色描述
   */
  @Column('varchar', { length: 200, nullable: true })
  description: string

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date
}
