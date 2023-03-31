import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull, DataType} from 'sequelize-typescript';

@Table
export class Admin extends Model<Admin> {
    static find(arg0: { where: { name: any; }; }) {
        throw new Error('Method not implemented.');
    }

@Column({
    primaryKey:true,
    autoIncrement:true
})
id!:number;

@AllowNull(false)
@Column
name!:string;

@AllowNull(false)
@Column
email!:string

@AllowNull(false)
@Column({defaultValue: false})
isSuperAdmin!: boolean


}