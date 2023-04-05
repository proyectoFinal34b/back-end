import { Model, Column, Table, AllowNull, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Order extends Model<Order> {

  @Column({
    primaryKey:true,
    autoIncrement:true
})
id!:number

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.INTEGER))
  list!: number[];

  @AllowNull(false)
  @Column
  delivery!: string;

  @AllowNull(false)
  @Column
  status!: string;

  @BelongsTo(() => User, 'orderId')
  order!: User;
  
  @ForeignKey(() => User)
  @Column
  orderId!: number;

}