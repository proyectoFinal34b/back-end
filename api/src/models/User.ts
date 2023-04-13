import {Model, Column, Table, AllowNull, BelongsToMany, HasMany, DataType} from 'sequelize-typescript';
import { IsIn } from 'class-validator';
import { Cat } from './Cat';
import { Order } from './Order';
import {UserCat} from "./UserCat"

@Table
export class User extends Model<User> {
    static id: any;
    static email: string | undefined;
    static tokenResetPassword: any;
  
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
password!:string

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
 @Column(DataType.BIGINT)
 phoneNumber!: bigint;
 
 @AllowNull(true)
 @Column
 adress!: string
 @AllowNull(true)
 @Column
 tokenResetPassword!: string


 @AllowNull(true)
 @Column({defaultValue: "Imagen default"})
 image!: string

@Column({defaultValue:"user"})
@IsIn(["user", "admin", "superAdmin"])
status!: string

 @HasMany(() => Cat, 'sponsorId')
 sponsoredCats!: Cat[];

 @HasMany(()=> Order, "orderId")
 orders!: Order[];
}
