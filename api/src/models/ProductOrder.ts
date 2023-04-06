import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import { Product } from './Product';
import { Order } from './Order';


@Table
export class ProductOrder extends Model {

  @ForeignKey(() => Product)
  @Column
  productId!:number;

  @ForeignKey(() => Order)
  @Column
  orderId!: number;
}