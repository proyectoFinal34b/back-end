import {Model, Column, Table, DataType, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!:number

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    nombre!:string
    
    @Column({
        type: DataType.NUMBER,
        allowNull:false
    })
    telefono!:number

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    email!:string
    
    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;  
}