/*
    Path: api/mensajes
*/

const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuarios');
const { obtenerChat } = require('../controllers/mensajes');

const router = Router();


router.get('/:de', validarJWT, obtenerChat);



module.exports = router;