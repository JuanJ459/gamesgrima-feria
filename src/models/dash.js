const mongoose = require('mongoose');
const {
    Schema
} = mongoose;



const usuarios = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    identificacion: {
        type: Number,
        required: true,
    },
    rol: {
        type: String,
        default: 'Usuario Externo',
        required: false,
    }

    //48.19
});

module.exports = mongoose.model('usuarios', usuarios);