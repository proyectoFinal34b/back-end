import {Model, Column, Table, DataType, AllowNull, CreatedAt, UpdatedAt} from 'sequelize-typescript';

interface Discount {
  value: number;
  active: boolean;
}

@Table
export class Product extends Model<Product> {
  @AllowNull(false)
  @Column
    name!: string;

  @AllowNull(false)  
  @Column
    summary!: string;

  @AllowNull(false)
  @Column
    image!: string;

  @AllowNull(false)
  @Column
    stock!: number;

  @AllowNull(false)
  @Column
    price!: number

  @AllowNull(true)
  @Column(DataType.JSON)
    discount!: Discount

  @AllowNull(false)
  @Column
    rating!: number
}