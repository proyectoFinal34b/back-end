import {sequelize} from "./src/db"
import app from './src/app';
import config from './lib/config';

sequelize
.sync({force: true, logging: false})
.then(()=>{
    console.log("db conectada ");
    app.listen(config.port, function () {
        console.log(`App is listening on port ${config.port}!`);
    })
}).catch((error)=> console.error(error))