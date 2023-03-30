import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
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
 @Column
 sponsor!: string;

 @AllowNull(true)
 @Column
 Order!: string;

 @CreatedAt
 @Column
 createdAt!: Date;

 @UpdatedAt
 @Column
 updatedAt!: Date;
}
