import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Category } from "./Category"; // 外键
import { snakeCase } from 'lodash';

export interface SupplierRowData {
  principal?: string;
  tel?: string;
  area?: string;
}

@Entity()
export class Supplier {
  constructor({ principal, tel, area }: SupplierRowData) {
    this.principal = principal;
    this.tel = tel;
    this.area = area;
  }

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 负责人姓名
   */
  @Column('varchar', { length: 10 })
  principal: string;

  /**
   * 负责人联系方式
   */
  @Column('varchar', { length: 20 })
  tel: string;

  /**
   * 加盟商所在地区 省/市/区/街道
   */
  @Column('varchar', { length: 150 })
  area: string;

  /**
   * 供货商详细地址
   */
  @Column('varchar', { length: 50 })
  address: string;

  /**
   * 供货商类型 1:公司 2:个人
   */
  @Column('int', { name: snakeCase('supplierType'), length: 1 })
  supplierType: number;

  /**
   * 收款方式 bank | ali | wechat
   */
  @Column('char', { name: snakeCase('payType'), length: 10 })
  payType: string;

  /**
   * 汇款账号
   */
  @Column('varchar', { name: snakeCase('accountNo'), length: 24 })
  accountNo: string;

  /**
   * 银行名称
   */
  @Column('varchar', { name: snakeCase('bankName'), length: 10, nullable: true })
  bankName: string;

  /**
   * 持卡人姓名
   */
  @Column('char', { name: snakeCase('bankUsername'), length: 10, nullable: true })
  bankUsername: string;

  /**
   * 开户行地址
   */
  @Column('varchar', { name: snakeCase('bankAddress'), length: 50, nullable: true })
  bankAddress: string;

  /**
   * 商品类目
   */
  @Column('varchar', { length: 150 })
  category: string;

  // @ManyToMany(type => Category)
  // @JoinTable()
  // categories: Category[];
}