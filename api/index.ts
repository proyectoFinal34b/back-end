import app from './src/app';
import config from './lib/config';


app.listen(config.port, function () {
 console.log('App is listening on port 3001!');
});