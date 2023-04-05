import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import { Cat } from './Cat';
import { User } from './User';


@Table
export class UserCat extends Model {
  
  @ForeignKey(() => User)
  @Column
  userId!:number;

  @ForeignKey(() => Cat)
  @Column
  catId!: number;
}