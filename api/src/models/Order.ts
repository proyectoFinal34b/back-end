import { Model, Column, Table, AllowNull, DataType } from 'sequelize-typescript';

@Table
export class Order extends Model<Order> {

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.INTEGER))
  list!: number[];

  @AllowNull(false)
  @Column
  delivery!: string;

  @AllowNull(false)
  @Column
  status!: string;

}