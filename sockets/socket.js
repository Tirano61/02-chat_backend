//Node server

const { comprobatJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const usuario = require('../models/usuario');

//Mensajes de sockets
io.on('connection', async (client) => {
    console.log('Clente Conectado');

    const [valido, uid] = comprobatJWT(client.handshake.headers['x-token']);

    if (!valido) {
        return client.disconnect();
    }

    //Cliente autenticado
    await usuarioConectado(uid);

    //Ingresar al usuario a una sala en particular
    //Sala global
    client.join(uid);
    //Escuchar del cliente mensaje personal
    client.on('mensaje-personal', async (payload) => {

        await grabarMensaje(payload);

        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });





    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);
    //     io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    // });

});