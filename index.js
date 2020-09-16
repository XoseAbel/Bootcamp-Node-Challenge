import express from 'express';
import initUsers from './usersCollection';

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//confg adicional, para evitar problemas de cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
  app.options('*', (req, res) => {
    // allowed XHR methods
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PATCH, PUT, POST, DELETE, OPTIONS'
    );
    res.send();
  });
});

// iniciar nuestras colecciones
initUsers(app);

app.listen(PORT, () => {
  console.log('App listening on port: ' + PORT);
});
