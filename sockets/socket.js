//Node server

const { io } = require('../index');

//Mensajes de sockets
io.on('connection', client => {
    console.log('Clente Conectado');

    client.on('disconnect', () => {
        console.log('Clente desconectado');
    });





    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);
    //     io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    // });

});