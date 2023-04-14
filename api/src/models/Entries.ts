import {Model, Column, Table, DataType, AllowNull, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Entries extends Model<Entries> {
  @AllowNull(false)
  @Column
  title!: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  images!: string[];

  @AllowNull(false)
  @Column
  summary!: string;
}

//relacion por FK con un Admin