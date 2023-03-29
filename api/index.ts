import {sequelize} from "./src/db"
import app from './src/app';
import config from './lib/config';

sequelize
.sync({force: true, logging: false})
app.listen(config.port,'0.0.0.0',function () {
 console.log(`App is listening on port ${config.port}!`);
});