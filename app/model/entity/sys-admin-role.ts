/**
 * 后台管理系统-角色表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinTable, ManyToMany } from 'typeorm'
import AdminUser from './sys-admin-user'
import AdminDepartment from './sys-admin-department'
import AdminAccess from './sys-admin-access'

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
   * 角色的归属部门
   */
  @ManyToMany(type => AdminDepartment, AD => AD.role)
  department: AdminDepartment[]

  /**
   * 角色下的用户群
   */
  @ManyToMany(type => AdminUser, AU => AU.role)
  user: AdminUser[]

  /**
   * 角色<n——n>权限
   * @description 角色拥有的权限
   */
  @ManyToMany(type => AdminAccess, AA => AA.role)
  @JoinTable()
  access: AdminAccess[]

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
