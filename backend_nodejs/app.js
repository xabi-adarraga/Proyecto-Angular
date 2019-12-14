"use strict";
// Servidor
// configuración de express
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
// cargar archivos rutas
var project_routes = require("./routes/project");

// middlewares
/* es un método que se ejecuta antes de ejecutar la acción de un controlador
 de ejecutar el resultado de la petición*/

// convertir un dato a un objeto json bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// culaquier dato que llegue se convierte a json
app.use(bodyParser.json());

// CORS
/*
configurar las cabeceras y el acceso CORS en NodeJS.
Cuando hacemos peticiones AJAX con jQuery o Angular a un backend o un API REST es normal que tengamos problemas con el acceso CORS en NodeJS y nos fallen las peticiones.
Para eso podemos crear un middleware como este
qué es el CORS?
Permite el acceso de un dominio a otro, configura las cabezeras 
https://developer.mozilla.org/es/docs/Web/HTTP/Access_control_CORS
se ejecuta antes que las peticiones
*/
app.use((req, res, next) => {
  // en vez de '*' sería poner la url permitida u origenes permitidos
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// rutas ********************************
// sobreescribe la ruta para que la cargue en app
// use --> para crear el middleware
app.use('/api', project_routes)
/*
Desde la ráiz sin ponerle nada 
app.use('/', project_routes)

*/

/* recibe una solicitud y una respuesta la recoge los datos que yo le puedo estar enviando desde el cliente o desde la petición que yo haga y la red es la responsable que yo voy a estar enviando.*/
/*
app.get("/", (req, res) => {
  // respuesta exitosa
  res.status(200).send("<h1>Página de inicio</h1>");
});

app.post("/test/:id", (req, res) => {
  // recoge los parámetros del body enviado por post
  console.log(req.body.nombre + " "  + req.body.apellidos);
  // recoge el parámetro de la url enviado por get
  // http://localhost:3700/test?web=estoeslaweb.com
  console.log(req.query.web);
  // parámetro que envío como forma de parámetro de la ruta en la web de nodejs.
  // http://localhost:3700/test/aqui_el_id?web=estoeslaweb.com
  console.log(req.params.id);
  console.log(res);
  // respuesta exitosa
  res.status(201).send({
    message: "Hola mundo desde mi api de nodejs"
  });
});*/

// exportar ************************************
module.exports = app;
