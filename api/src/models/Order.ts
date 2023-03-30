import {Model, Column, Table, AllowNull} from 'sequelize-typescript';

@Table
export class Order extends Model<Order> {
  @AllowNull(false)
  @Column
    date!: Date;
  
  @AllowNull(false)
  @Column
    state!: string;
}