"use strict";
// importar módulo de moongose
const mongoose = require("mongoose");
const app = require("./app");
const port = 3700;
// solución problema con las advertencias -->
mongoose.set("useFindAndModify", false);
//conexión a la bbdd
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/portafolio",
  // solución problema con las advertencias --> DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` que da al subir imagenes
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  // fin problema con las advertencias
  )
  .then(() => {
    console.log("Conexión a la base de datos establecida con exito...");
    // creación del servidor
    app.listen(port, () => {
      console.log(
        "Servidor corriendo correctamente en la url: localhost:" + port
      );
    });
  })
  .catch(err => console.log(err));
