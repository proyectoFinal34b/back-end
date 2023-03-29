import dotenv from 'dotenv';

dotenv.config();

const config = {
 dbUser: process.env.DB_USER || 'postgres',
 dbPassword: process.env.DB_PASSWORD || 'dQivrlDXtIoBCHWgp5RC',
 dbHost: process.env.DB_HOST || 'containers-us-west-63.railway.app',
 dbName: process.env.DB_NAME || 'railway',
 dbPort: process.env.DB_PORT || "7746",
 dev: process.env.NODE_ENV !== 'production',
 port: process.env.API_PORT || "3001",
 host: process.env.API_host || 'localhost',
 cors: process.env.CORS || '*',
 dialect:process.env.DIALECT || "postgres"
};


export default config;