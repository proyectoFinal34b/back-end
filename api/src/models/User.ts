import {Model, Column, Table, AllowNull, HasMany} from 'sequelize-typescript';
import { IsIn } from 'class-validator';
import { Cat } from './Cat';


@Table
export class User extends Model<User> {

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
 @Column
 phoneNumber!: number;


 @AllowNull(true)
 @Column({defaultValue:"imagendefault"})
 image!: string

@Column({defaultValue:"user"})
@IsIn(["user", "admin", "superAdmin"])
status!: string

 @HasMany(() => Cat, 'sponsorId')
 sponsoredCats!: Cat[];
}
