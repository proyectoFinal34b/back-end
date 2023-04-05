import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull, DataType, BelongsToMany} from 'sequelize-typescript';
import { Cat } from './Cat';
import {UserCat} from "./UserCat"

@Table
export class User extends Model<User> {
  
  [x: string]: any;
    static find(arg0: { where: { name: any; }; }) {
        throw new Error('Method not implemented.');

       
    }
@BelongsToMany(()=>Cat, ()=> UserCat)
    cats!: Cat[];

@Column({
    primaryKey:true,
    autoIncrement:true
})
id!:number

@AllowNull(false)
@Column
name!: string;

@AllowNull(false)
 @Column
 lastName!: string;

 @AllowNull(false)
 @Column({
    unique:true
 })
 email!:string;
 // implementar mensaje email repetido

 @AllowNull(false)
 @Column
 active!:boolean;
 defaultValue: boolean = true;

 @AllowNull(true)
 @Column
 phoneNumber!: number;


 @AllowNull(true)
 @Column({defaultValue: "Imagen default"})
 image!: string

 @CreatedAt
 @Column
 createdAt!: Date;

 @UpdatedAt
 @Column
 updatedAt!: Date;
}
