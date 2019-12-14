'use strict'
// carga el módulo express para crear nuestras rutas
const express = require('express');
// cargamos el controlador
var ProjectController = require('../controllers/project');

// cargamos el servicio de la ruta para usar sus métodos
const router = express.Router();

/* para poder subir archivos importamos el multiparty
 Middleware es una acción que se ejecuta antes de que se ejecute el método o la acción del controlador */
var multipart = require('connect-multiparty');
// llama a la función multipart para decirle donde guardar las archivos
var multipartMiddleware = multipart({uploadDir: './uploads'});

// que utilce el método del controlador
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
// la ? indica que el parámetro id es opcional
router.get('/project/:id?', ProjectController.getProject);
// sacar resultados del backend
router.get('/projects', ProjectController.getProjects);
// modificar un documento
router.put('/project/:id', ProjectController.updateProject);
// eliminar un documento
router.delete('/project/:id', ProjectController.deleteProject);
// Subir imagen al servidor
// para que se ejecute le Middleware se le pasa como segundo parámetro
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
// ruta para mostrar la imagenes en projects
router.get('/get-image/:image',ProjectController.getImageFile);
// utliza la variable router para poderlo utilizarolo importarlo
module.exports = router;
