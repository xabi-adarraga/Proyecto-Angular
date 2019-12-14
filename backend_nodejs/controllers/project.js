"use strict";
// para crear un nuevo proyecto hay que imoportar el módelo
const Project = require("../models/project");
// importar libreria fs(filesystem) para borrar archivos
var fs = require("fs");
// modulo que permite cargar rutas de nuestro sistema de archivos
var path = require('path');

// controladores rutas
var controller = {
  home: function(req, res) {
    return res.status(200).send({
      mesagge: "Soy la home"
    });
  },
  test: function(req, res) {
    return res.status(200).send({
      mesagge: "Soy el método test del controlador de project"
    });
  },
  /*
    request los datos del body de la petición y los parametros que le envies en la petición a la url del api
    y response la respuesta que va a devolver el api
    */

  // método para guardas nuevos documentos
  saveProject: function(req, res) {
    // instanciamos el nuevo modelo de objeto
    var project = new Project();
    // recogemos los párametros que llegan por el body de la petición
    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    // Guardar lo que recibe en la bbdd
    project.save((err, projectStored) => {
      if (err) return res.status(500).send({ mesagge: "Error al guardar" });
      if (!projectStored)
        return resizeTo
          .status(404)
          .send({ mesagge: "No se ha podido guardar el proyecto" });
      return res.status(200).send({ project: projectStored });
      console.log("Archivos subidos con exito");
    });
    /*return res.status(200).send({
      project:project,
      mesagge: "Método SaveProject"
    });*/
  },

  // método para listar un documento
  getProject: function(req, res) {
    // recoger el valor que llega por la url en este caso projectId
    var projectId = req.params.id;

    // Al poner en el controlador que el parámetro id es opcional, hay que comprobarlo que sea o no null
    if (projectId == null)
      return res.status(404).send({
        mesagge: "El proyecto no existe o no se ha introducido el parámetro id."
      });

    // Usamos el modelo Project
    Project.findById(projectId, (err, project) => {
      if (err)
        return res
          .status(500)
          .send({ mesagge: "Error al devolver los datos." });
      if (!project)
        return res.status(404).send({ mesagge: "El proyecto no existe." });
      return res.status(200).send({
        project
      });
    });
  },

  // Método para listar todos los documentos
  getProjects: function(req, res) {
    // find saca todos los documentos que hay dentro de una entidad
    // se le puede pasar un where project.find({year:2019})
    // exec cuando saque los resultados
    // sort() con el simbolo + o - ordena de mayor a menor
    Project.find({})
      .sort("-year")
      .exec((err, projects) => {
        if (err)
          return res
            .status(500)
            .send({ mesagge: "Error al devolver los datos." });
        if (!projects)
          return res
            .status(404)
            .send({ mesagge: "No  hay proyectos que mostrar." });
        return res.status(200).send({ projects });
      });
  },

  // actualizar documento
  updateProject: function(req, res) {
    // recoger un parámetro por la url para modificarlo
    var projectId = req.params.id;
    // recoger todo el body de la petición, el objeto completo con los datos ya actualizados de la petición
    var update = req.body;
    // para que nos devuelva el objeto nuevo se le añade un tercer parámetro{new:true}, si no nos devolvería el antiguo en postman aunque lo cambia en la bbdd.
    Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true },
      (err, projectUpdated) => {
        if (err)
          return res.status(500).send({ message: "Error al actualizar." });
        if (!projectUpdated)
          return res
            .status(404)
            .send({ mesagge: "No existe el proyecto para actualizar." });

        return res.status(200).send({
          project: projectUpdated
        });
      }
    );
  },
  // Método para borrar un documento
  deleteProject: function(req, res) {
    var projectId = req.params.id;
    Project.findByIdAndDelete(projectId, (err, projectRemove) => {
      if (err)
        return res
          .status(500)
          .send({ message: "No se ha podido borrar el proyecto." });
      if (!projectRemove)
        return res
          .status(404)
          .send({ mesagge: "No se puede eliminar ese proyecto." });

      return res.status(200).send({
        project: projectRemove
      });
    });
  },
  // Método para subir ficheros (imagenes)
  uploadImage: function(req, res) {
    var projectId = req.params.id;
    var fileName = "Imagen no subida...";

    if (req.files) {
      // sacamos la ruta de la imagen
      var filePath = req.files.image.path;
      // sacamos el nombre real recortado de la ruta
      // "path": "uploads\\1N4TXfDFqm5gDp5MWAiiXTVk.jpg"
      var fileSplit = filePath.split("\\");
      var fileName = fileSplit[1]; // devuleve --> el nombre del archivo // devuelve --> 1N4TXfDFqm5gDp5MWAiiXTVk.jpg
      console.log("Carpeta destino " + fileSplit[0]); // devuleve --> uploads
      // variable para recoger la extensión del archivo para comprobar que sea correcta
      var extSplit = fileName.split("\.");
      var fileExt = extSplit[1]; // <-- extensión
      fileExt = fileExt.toLocaleLowerCase();
      // com probar tipo de archivo
      console.log("Mostrar req." + req.files.image);
      console.log(extSplit[1]);
      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        // le pasamos la propiedad imagen para que la guarde
        Project.findByIdAndUpdate(
          projectId,
          // le pasamos para que guarde el nombre del fichero
          { image: fileName },
          // para que devuelva el último objeto guardado
          { new: true },
          (err, projectUpdated) => {
            if (err) {
               // eliminamos el archivo de la carpeta del servidor si nos da un error
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.log(err);
                }
                console.log(
                  "Archivo eliminado porque no se encontro el proyecto o id no valido"
                );
              });
              return res
                .status(500)
                .send({ message: "La imagen no se ha subido." });
            }
            if (!projectUpdated) {
              // eliminamos el archivo de la carpeta del servidosr si no se encuentra el proyecto
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.log(err);
                }
                console.log(
                  "Archivo eliminado porque no se encontro el proyecto o id no valido"
                );
              });

              return res
                .status(404)
                .send({
                  mesagge: "El proyecto no existe y no se ha subido la imagen."
                });
            }
            return res.status(200).send({
              project: projectUpdated,
              message: req.files
            });
          }
        );
        // en el caso de que no sea ninguno la borra, hay que exprotar la libreria ls
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({
            mesagge: "La extensión no es valida"
          });
        });
      } // cierre else extensión inválida
    } // cierre del if(req.files)
    else {
      return res.status(200).send({
        message: fileName
      });
    }
  },
  getImageFile: function(req,res){
    var file = req.params.image;
    var path_file = './uploads/' + file;
    fs.exists(path_file, (exists) =>{
      if(exists){
        return res.sendFile(path.resolve(path_file));
      }else {
        return res.status(200).send({
          message: "NO existe la imagen..."
        });
      }
    });
  }
  //coprobar imagenes http://localhost:3700/api/get-image/img.jpg
};
module.exports = controller;
