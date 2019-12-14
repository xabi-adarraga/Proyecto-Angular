// para variables que se van a usar en distintos archivos, en servicios como en componentes

// variable objeto json con la url del api
var today = new Date();
var year = today.getFullYear();
export var Global = {
  //  url: 'http://localhost:4200/api/',
    url: 'http://localhost:3700/api/', //servidor node 
    year: year
}