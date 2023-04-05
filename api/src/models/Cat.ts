import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull, DataType, BelongsTo, ForeignKey, BelongsToMany} from 'sequelize-typescript';
import { User } from './User';
import { CatSponsor } from './CatSponso';

@Table
export class Cat extends Model<Cat> {
  static find(arg0: { where: { name: any; }; }) {
    throw new Error('Method not implemented.');
}
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
 @Column
 arrived!:Date

 @CreatedAt
 @Column
 createdAt!: Date;

 @UpdatedAt
 @Column
 updatedAt!: Date;

 @BelongsToMany(() => User, () => CatSponsor)
 sponsors!: User[] | null;
 
 @ForeignKey(() => User)
 @Column
 sponsorId!: number;
}
