import {Model, Column, Table, DataType, AllowNull, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Product } from './Product';

@Table
export class Rating extends Model<Rating> {
  @AllowNull(false)
  @Column
    rated!: string;

  @AllowNull(true)
  @Column
    review!: string;


    @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

}