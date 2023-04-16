import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull, DataType, ForeignKey, BelongsToMany} from 'sequelize-typescript';
import { User } from './User';
import { UserCat } from './UserCat';

@Table
export class Cat extends Model<Cat> {
  static catId: [];
  
  static find(arg0: { where: { name: any; }; }) {
    throw new Error('Method not implemented.');
}
@BelongsToMany(()=>User, ()=> UserCat)
sponsor!: User[];
  
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
 gender!: string;

 @AllowNull(false)
 @Column(DataType.TEXT)
 description!:string;

 @AllowNull(true)
 @Column(DataType.ARRAY(DataType.STRING))
 image!:string[];

 @AllowNull(false)
 @Column({ defaultValue: true })
 status!:boolean;

 @AllowNull(false)
 @Column
 state!:string;// establecer como opciones: adoptado || apadrinado || alberge

 @AllowNull(true)
 @Column({ defaultValue:"corto"})
 hairType!:string

 @AllowNull(false)
 @Column({defaultValue:false})
 sterilization!:boolean

 @AllowNull(true)
 @Column({defaultValue:false})
 vaccinesFull!:boolean

 @AllowNull(true)
 @Column({defaultValue:false})
 deworming!:boolean

 @AllowNull(true)
 @Column({defaultValue:false})
 chip!:boolean

 @AllowNull(true)
 @Column
 arrived!:Date
 
 @ForeignKey(() => User)
 @Column(DataType.ARRAY(DataType.INTEGER))
 sponsorId!: number[];
}
