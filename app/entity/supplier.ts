import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Category } from "./Category"; // 外键

@Entity()
export class Supplier {
  constructor({ title, text }) {
    this.title = title;
    this.text = text;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  text: string;

  // @ManyToMany(type => Category)
  // @JoinTable()
  // categories: Category[];

}