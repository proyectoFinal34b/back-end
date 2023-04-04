import { sequelize } from "./src/db"
import app from './src/app';
import config from './lib/config';
import { Cat } from "./src/models/Cat";

sequelize
.sync({alter: true, logging: false})
app.listen(3001, function () {
 console.log(`App is listening on port ${config.dbPort}!`);
});

