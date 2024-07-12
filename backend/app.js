const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const url = 'mongodb://localhost:27017/aroundb';
const { jwtMiddleware } = require('./middleware/auth');

mongoose.connect(url)


const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

/* //Solucion temporal
app.use((req, res, next) => {
  req.user = {
    _id: '6638d7854dae42105bc4e127' // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
}); */



app.post('/signin', login);
app.post('/signup', createUser);

//Rutas protegidas
app.use('/users', jwtMiddleware, users);
app.use('/cards', jwtMiddleware, cards);

// Ruta por defecto: devuelve un mensaje de error para cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(` Servidor en ejecución en http://localhost:${PORT}`);
});
