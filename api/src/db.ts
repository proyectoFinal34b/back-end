import {Sequelize} from 'sequelize-typescript';
import {User} from "./models/User"
import {Cat} from "./models/Cat"
import { Product } from './models/Product';
import { Order } from './models/Order';
import { Category } from './models/Category';
import config from '../lib/config';
import dotenv from "dotenv"
dotenv.config();

config;

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 7746,
    models: [__dirname + '/models'],
  });

//relacion de modelos
  function associateModels() {
    User.belongsToMany(Cat, { through: 'UserCats' });
    Cat.belongsToMany(User, { through: 'UserCats' });
    Product.hasMany(Category)
    Category.hasMany(Product)
    User.hasMany(Order)
    Order.belongsTo(User)
    Order.hasMany(Product)
    Product.hasMany(Order)
}

associateModels();

console.log(User.associations);
