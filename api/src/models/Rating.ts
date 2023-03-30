import {Model, Column, Table, DataType, AllowNull, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Category extends Model<Category> {
  @AllowNull(false)
  @Column
    rated!: string;

  @AllowNull(true)
  @Column
    review!: string;
}