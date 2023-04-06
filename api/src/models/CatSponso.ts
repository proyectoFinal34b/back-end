import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import { Cat } from './Cat';
import { User } from './User';

@Table
export class CatSponsor extends Model<CatSponsor> {
  @ForeignKey(() => Cat)
  @Column
  catId!: number;

  @ForeignKey(() => User)
  @Column
  sponsorId!: number;
}