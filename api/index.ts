import { sequelize } from "./src/db"
import app from './src/app';
import config from './lib/config';

sequelize
.sync({force: true, logging: false})
app.listen(3001, function () {
 console.log(`App is listening on port 3001!`);
});