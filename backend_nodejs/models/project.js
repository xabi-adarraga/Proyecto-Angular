'use strict'
// importamos mongoose que es lo que se encarga de trabajar con los módelos
const mongoose = require('mongoose');
// definir el esquema de un módelo
const Schema = mongoose.Schema;

// molde sobre el cual se crean nuevos documentos
var ProjectSchema = Schema ({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

// para poder importar este fichero desde otros
// Project mongoose lo pone a minusculas y lo pluraliza por lo que ya existe en nuestra base
// projects guarda los documents en la colección
module.exports = mongoose.model('Project', ProjectSchema);
