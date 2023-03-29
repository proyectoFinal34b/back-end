import {Model, Column, Table, DataType, AllowNull, CreatedAt, UpdatedAt} from 'sequelize-typescript';

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

  @AllowNull(false)
  @Column
    discount!: number

  @AllowNull(false)
  @Column
    rating!: number
}