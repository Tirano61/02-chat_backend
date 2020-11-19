const mongoose = require('mongoose');


const dbconnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('db-online');
    } catch (e) {

        console.log(e);
        throw new Error('Error en la base de datos, hable con el admin');
    }
}

module.exports = { dbconnection }