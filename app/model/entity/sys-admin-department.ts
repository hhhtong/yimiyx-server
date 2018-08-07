/**
 * 后台管理系统-部门表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm'
import AdminUser from './sys-admin-user';

@Entity()
export default class AdminDepartment {

  @PrimaryGeneratedColumn()
  departmentId: number

  /**
   * 部门下有哪些用户
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
