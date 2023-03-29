import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Cat extends Model<Cat> {

@Column
name!: string;

 @Column
 age!: number;

 @Column
 description!:string;
  
 @CreatedAt
 @Column
 createdAt!: Date;

 @UpdatedAt
 @Column
 updatedAt!: Date;
}