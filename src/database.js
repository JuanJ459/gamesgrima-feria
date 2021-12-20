const mongoose = require('mongoose');

const db = 'mongodb://localhost/db_sprint';
mongoose.connect(db)
.then(db => console.log('Conexión a la base de datos exitosa'))
.catch(err => console.error(err))
module.exports = mongoose;
