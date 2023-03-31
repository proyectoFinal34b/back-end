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
    port: 5432,
    models: [__dirname + '/models'],
  });

//relacion de modelos
  function associateModels() {
    User.belongsToMany(Cat, { through: 'UserCats' });
    Cat.belongsToMany(User, { through: 'UserCats' });
    Product.belongsToMany(Category,{ through: 'ProductCategory' })
    Category.belongsToMany(Product,{ through: 'ProductCategory' })
    User.hasMany(Order)
    Order.belongsTo(User)
    Order.belongsToMany(Product, { through: 'OrderProduct' });
    Product.belongsToMany(Order, { through: 'OrderProduct' });
}

associateModels();

console.log(User.associations);
console.log(Product.associations);
