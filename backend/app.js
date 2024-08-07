const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const users = require("./routes/users");
const cards = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const url = "mongodb://localhost:27017/aroundb";
const { jwtMiddleware } = require("./middleware/auth");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { errors } = require("celebrate");
const cors = require("cors");


mongoose.connect(url);

const app = express();
const { PORT = 8001 } = process.env;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Cors
app.use(cors());
app.options('*', cors());

app.use(requestLogger);
app.post("/signin", login);
app.post("/signup", createUser);

//Rutas protegidas
app.use("/users", jwtMiddleware, users);
app.use("/cards", jwtMiddleware, cards);

app.use(errorLogger);

app.use(errors()); // controlador de errores de celebrate

// Ruta por defecto: devuelve un mensaje de error para cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(` Servidor en ejecución en http://localhost:${PORT}`);
});
