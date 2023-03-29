import {sequelize} from "./src/db"
import app from './src/app';
import config from './lib/config';
console.log(config)

sequelize
.sync({force: true, logging: false})
app.listen(config.port, function () {
 console.log(`App is listening on port ${config.port}!`);
});