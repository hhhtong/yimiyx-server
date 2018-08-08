/**
 * 后台管理系统-权限表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import AdminUser from './sys-admin-user'
import AdminDepartment from './sys-admin-department'
import AdminRole from './sys-admin-role'

@Entity()
export default class AdminAccess {
  @PrimaryGeneratedColumn()
  accessId: number

  /**
   * 权限的归属部门
   */
  @ManyToMany(type => AdminDepartment, AD => AD.access)
  department: AdminDepartment[]

  /**
   * 权限的归属角色
   */
  @ManyToMany(type => AdminRole, AR => AR.access)
  role: AdminRole[]

  /**
   * 权限的归属用户
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
}
