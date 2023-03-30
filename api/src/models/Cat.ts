import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull, DataType} from 'sequelize-typescript';

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
 @Column(DataType.ARRAY(DataType.STRING))
 image!:string[];

 @AllowNull(false)
 @Column({ defaultValue: true })
 status!:boolean;

 @CreatedAt
 @Column
 createdAt!: Date;

 @UpdatedAt
 @Column
 updatedAt!: Date;
}