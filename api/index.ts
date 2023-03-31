import { sequelize } from "./src/db"
import app from './src/app';
import config from './lib/config';

sequelize
.sync({force: false, logging: false})
app.listen(config.host, function () {
 console.log(`App is listening on port ${config.host}!`);
});