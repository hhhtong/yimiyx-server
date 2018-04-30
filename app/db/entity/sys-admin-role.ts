/**
 * 后台管理系统-角色表
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class SysAdminRole {
  @PrimaryGeneratedColumn()
  roleID: number;

  /**
   * 角色名
   */
  @Column('varchar', { length: 64 })
  roleName: string;

  /**
   * 角色描述
   */
  @Column('varchar', { length: 200, nullable: true })
  roleDesc: string;

  /**
   * 角色类型
   * 1、超级管理员
   * 2、店长
   * 3、仓库管理员
   * 4、采购员
   */
  @Column('tinyint', { default: 2 })
  roleType: number
}