import {Sequelize} from 'sequelize-typescript';
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