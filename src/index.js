const express = require('express');
const morgan = require('morgan');
const path = require('path'); //Viene instalado cuando instalamos NODEJS
const {moongose} = require('./database');
const app = express();

//Configuración
// process.env.PORT : Toma el puerto otorgado por un servicio de alojamiento en la nube para una web
app.set("port", process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Rutas
app.use('/api/admin',require('./routes/rutas.routes'));
//Archivos Estaticos

    //path join lo que hace es unir las rutas que nos otorga __dirname 
    //(la cual regresa la carpeta donde se encuentra el archivo que esta llamando la constante, en este caso sería SRC) y la carpeta public
    //la ventaja que da es la de identificar en que sistema se requiere unir estas rutas
    //cosas que evita: Windows: \, Linux: /

    // console.log(path.join(__dirname, 'public'));   <------ IMPORTANTE

//Le decimos a express donde se encuentra nuestra carpeta PUBLIC
app.use(express.static(path.join(__dirname, 'public')));




//Iniciar servidor
//app.get("port"): Obtiene el puerto, como una variable
app.listen(app.get("port"), () => {
    //${app.get("port")}: es posible mostrarlo en consola gracias a alt + gr + ñ+1teclaright ``
    console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});