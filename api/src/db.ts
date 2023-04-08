import {Sequelize} from 'sequelize-typescript';
import config from '../lib/config';
import dotenv from "dotenv"
dotenv.config();

config;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;


export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: dbPort,
    models: [__dirname + '/models'],
  });


//relacion de modelos
//   function associateModels() {
//     User.belongsToMany(Cat, { through: 'UserCats' });
//     Cat.belongsToMany(User, { through: 'UserCats' });
//     Product.belongsToMany(Category,{ through: 'ProductCategory' })
//     Category.belongsToMany(Product,{ through: 'ProductCategory' })
//     User.hasMany(Order)
//     Order.belongsTo(User)
//     Order.belongsToMany(Product, { through: 'OrderProduct' });
//     Product.belongsToMany(Order, { through: 'OrderProduct' });
// }

// associateModels();

// module.exports = {
//   ...sequelize.models,
//  sequelize
// }

