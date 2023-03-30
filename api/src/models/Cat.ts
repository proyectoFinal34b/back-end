import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull} from 'sequelize-typescript';

@Table
export class Cat extends Model<Cat> {

@Column({
    primaryKey:true,
    autoIncrement:true
})
id!:number

@AllowNull(false)
@Column
name!: string;

 @Column
 age!: number;

 @AllowNull(false)
 @Column
 description!:string;

 @AllowNull(false)
 @Column
 image!:string;

 @AllowNull(false)
 @Column
 status!:string;

 @CreatedAt
 @Column
 createdAt!: Date;

 @UpdatedAt
 @Column
 updatedAt!: Date;
}