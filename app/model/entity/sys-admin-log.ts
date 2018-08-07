/**
 * 后台管理系统-部门表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import AdminUser from './sys-admin-user'

@Entity()
export default class AdminLog {

  @PrimaryGeneratedColumn()
  logId: number

  /**
   * 操作人
   */
  @ManyToOne(type => AdminUser, AU => AU.logs)
  user: AdminUser

  /**
   * 操作类型
   */
  @Column('tinyint')
  type: number

  /**
   * 操作内容
   */
  @Column('varchar', { length: 200 })
  content: string

  /**
   * 操作时间
   */
  @CreateDateColumn()
  createdAt: Date
}
