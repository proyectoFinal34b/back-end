import {Model, Column, Table, DataType, AllowNull, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Entries extends Model<Entries> {
  @AllowNull(false)
  @Column
    name!: string;
}