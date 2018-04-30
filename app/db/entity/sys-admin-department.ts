/**
 * 后台管理系统-部门表
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class SysAdminDepartment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parentID: number;

  /**
   * 部门名字
   */
  @Column('varchar', { length: 100, unique: true })
  name: string;
}
