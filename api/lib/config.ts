import { createSecretKey } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const config = {
 dbUser: process.env.DB_USER ,
 dbPassword: process.env.DB_PASSWORD ,
 dbHost: process.env.DB_HOST ,
 dbName: process.env.DB_NAME ,
 dbPort: process.env.DB_PORT ,
 dev: process.env.NODE_ENV ,
 port: process.env.API_PORT ,
 host: process.env.API_host  ,
 cors: process.env.CORS  ,
 dialect:process.env.DIALECT,
 emAdress:process.env.EMAIL_ADRESS,
 emPassword:process.env.EMAIL_PASSWORD,
 urlbase:process.env.URL_BASE

};



export default config;
