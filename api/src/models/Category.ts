import {Model, Column, Table, DataType, AllowNull, HasMany, CreatedAt, UpdatedAt} from 'sequelize-typescript';
import { Product } from "./Product"

@Table
export class Category extends Model<Category> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @AllowNull(false)
  @Column
    name!: string;

  @HasMany(() => Product)
    product!: Product;
}