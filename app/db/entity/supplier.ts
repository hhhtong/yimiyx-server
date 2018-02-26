import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Category } from "./Category"; // 外键

export interface SupplierRowData {
  principal?: string;
  tel?: string;
  cityId?: string;
}

@Entity()
export class Supplier {
  constructor({ principal, tel, cityId }: SupplierRowData) {
    this.principal = principal;
    this.tel = tel;
    this.cityId = cityId;
  }

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 负责人姓名
   */
  @Column('varchar', {
    length: 6,
    nullable: false
  })
  principal: string;

  /**
   * 负责人联系方式
   */
  @Column('varchar', {
    length: 20,
    nullable: false
  })
  tel: string;

  /**
   * 负责人联系方式
   */
  @Column('char', {
    length: 4,
    nullable: false
  })
  cityId: string;

  // @ManyToMany(type => Category)
  // @JoinTable()
  // categories: Category[];

}