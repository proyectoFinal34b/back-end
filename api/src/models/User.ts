import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

@Column
name!: string;

 @Column
 lastName!: string;

 @Column
 email!:string;

 @Column
 phoneNumber!: number;

 @CreatedAt
 @Column
 createdAt!: Date;

 @UpdatedAt
 @Column
 updatedAt!: Date;
}