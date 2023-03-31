import {Model, Column, Table, DataType, AllowNull, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import { Rating } from './Rating';

@Table
export class Product extends Model<Product> {
  @AllowNull(false)
  @Column
    name!: string;

  @AllowNull(false)  
  @Column
    summary!: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
    image!: string[];

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

    @HasMany(() => Rating)
    ratings!: Rating[];


}