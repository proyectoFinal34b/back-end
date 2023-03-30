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

  @AllowNull(true)
  @Column({type:DataType.JSON,  defaultValue: { 
    value: 0,
    active: false
  }})
    discount!: { value: number; active: boolean }

  @AllowNull(false)
  @Column
    rating!: number
}