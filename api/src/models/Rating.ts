import {Model, Column, Table, DataType, AllowNull, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Rating extends Model<Rating> {
  @AllowNull(false)
  @Column
    rated!: string;

  @AllowNull(true)
  @Column
    review!: string;
}