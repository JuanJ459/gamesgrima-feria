const express = require('express');
const router = express.Router();
const Usuarios = require('../models/dash');
router.get('/', async (req, res) => {
    const usuarios = await Usuarios.find();
    console.log(usuarios); /* Arreglo para ver que hay en integrantes */
    res.json(usuarios); /* Se obtienen los integrantes en la base de datos */

});

router.get('/:id',async (req, res)=> {
    const usuarios = await Usuarios.findById(req.params.id);
    res.json(usuarios); /* Se muestra la tarea encontrada por ID */
})

//router.post, metodo utilizado para agregar datos
/* Los datos que me envía el navegador están guardados en el objeto llamado REQ */
router.post('/', async (req, res) => {
    const {
        nombre,
        correo,
        identificacion,
        rol
    } = req.body;
    const usuarios = new Usuarios({nombre,correo, identificacion,  rol}); /* Es menos redundante y está actualizado */
    /* Es lo mismo que tener new task({
        nombre: nombre
        identificacion: identificacion
        ---- Lo que esta despues de los " : " es lo que se recibe en req.body, o sea, lo que se recibe en el cliente. NAVEGADOR
    }) */
    console.log(usuarios);
    await usuarios.save(); /* Guardamos en la base de datos */
    res.json({
        status: 'Usuario Añadido'
    });
});
/* Recibe el ID por parametro */
router.put('/:id', async (req, res) => {
    const {nombre,correo, identificacion, rol} = req.body;
    const nuevoUsuario = {nombre, correo, identificacion, rol};
    await Usuarios.findByIdAndUpdate(req.params.id, nuevoUsuario);


    // console.log(req.params.id);
    // res.json('Recibido');
    res.json(`Usuario Actualizado: ${req.params.id}}`);
});

router.delete('/:id', async (req, res) => {
    const {nombre, correo, identificacion, rol} = req.body;
    const eliminarIntegrante = {nombre, correo, identificacion, rol};
        await Usuarios.findByIdAndRemove(req.params.id);
        res.json({status: 'Usuario Eliminado'});
    
    

})
module.exports = router;