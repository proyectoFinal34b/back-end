import { Model, Column, Table, AllowNull, DataType, BelongsToMany } from 'sequelize-typescript';
import { Product } from "./Product"
import { ProductOrder } from "./ProductOrder"

@Table
export class Order extends Model<Order> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.INTEGER))
  list!: number[];

  @AllowNull(false)
  @Column
  delivery!: string;

  @AllowNull(false)
  @Column
  status!: string;

  @BelongsToMany(() => Product, () => ProductOrder)
    product!: Product;
}