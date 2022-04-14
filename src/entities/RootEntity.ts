import { Exclude, instanceToPlain } from "class-transformer";
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default abstract class RootEntity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number; // auto-generated ID for child classes

  @CreateDateColumn()
  createdAt: Date; // automatically add a createdAt timestamp for child classes

  @UpdateDateColumn()
  updatedAt: Date; // automatically add a updatedAt timestamp for child classes

  // override toJSON method to transform class (using class validator)
  toJSON() {
    return instanceToPlain(this);
  }
}
