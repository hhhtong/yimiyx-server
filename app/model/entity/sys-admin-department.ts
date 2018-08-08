/**
 * 后台管理系统-部门表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinTable, ManyToMany } from 'typeorm'
import AdminUser from './sys-admin-user'
import AdminAccess from './sys-admin-access'
import AdminRole from './sys-admin-role'

@Entity()
export default class AdminDepartment {

  @PrimaryGeneratedColumn()
  departmentId: number

  /**
   * 部门<n——n>权限
   * @description 部门拥有的权限
   */
  @ManyToMany(type => AdminAccess, AA => AA.department)
  @JoinTable()
  access: AdminAccess[]

  /**
   * 部门<n——n>角色
   * @description 部门拥有的角色
   */
  @ManyToMany(type => AdminRole, AA => AA.department)
  @JoinTable()
  role: AdminRole[]

  /**
   * 用户所在部门
   */
  @ManyToMany(type => AdminUser, AU => AU.department)
  user: AdminUser[]

  /**
   * 部门名字
   */
  @Column('varchar', { length: 100, unique: true })
  departmentName: string

  /**
   * 父级ID
   */
  @Column()
  parentID: number

  /**
   * 部门描述
   */
  @Column('varchar', { length: 200, nullable: true })
  description: string

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date
}
