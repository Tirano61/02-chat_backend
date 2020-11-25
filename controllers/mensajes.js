
const { response } = require('express');
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {
    const miUid = req.uid;
    const mensajeDe = req.params.de;

    const last30 = await Mensaje.find({
        $or: [{ de: miUid, para: mensajeDe }, { de: mensajeDe, para: miUid }]
    })
        .sort({ createdAt: 'desc' })
        .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    })
}


module.exports = {
    obtenerChat
}