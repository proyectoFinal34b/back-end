import { sequelize } from "./src/db";
import app from './src/app';
import config from './lib/config';
import { createData } from "./src/randomData/data"

sequelize.sync({ force: true, logging: false })
  .then(() => {
    console.log('Database synced successfully!');
    app.listen(config.dbPort, () => {
      console.log(`App is listening on port ${config.dbPort}!`);
      createData(); // Llamamos a la función createData después de que la base de datos esté sincronizada y la aplicación esté escuchando.
    });
  })
  .catch((err) => console.error('Error syncing database:', err));

