import http from 'http';
import app from './expressApp';
import config from './config';

const server = new http.Server(app);

server.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }

  console.info(`----\n==> ✅ twitter client is running`);
  console.info(`==> 💻  Open http://localhost:${config.port} in a browser to view the app.`);
});