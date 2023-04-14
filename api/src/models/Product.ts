import { Rating } from "./Rating";
import {Model, Column, Table, DataType, AllowNull, ForeignKey, CreatedAt, UpdatedAt, HasMany, BelongsToMany, BelongsTo} from 'sequelize-typescript';
import { Category } from './Category';
import { Order } from './Order';
import {ProductOrder}  from "./ProductOrder"

@Table
export class Product extends Model<Product> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  summary!: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  image!: string[];

  @AllowNull(false)
  @Column
  stock!: number;

  @AllowNull(false)
  @Column
  price!: number;

  @AllowNull(false)
  @Column({defaultValue:true})
  active!:boolean

  @AllowNull(true)
  @Column({
    type: DataType.JSON,
    defaultValue: {
      value: 0,
      active: false,
    },
  })
  discount!: { value: number; active: boolean };

  @HasMany(() => Rating)
  ratings!: Rating[];

  // @BelongsToMany(() => Rating, "productRating")
  //   ratings!: Rating[];

  @BelongsToMany(() => Order, () => ProductOrder)  
    order!: Order ;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
    categoryId!: number;

  @BelongsTo (() => Category)
    category!: Category;
}
