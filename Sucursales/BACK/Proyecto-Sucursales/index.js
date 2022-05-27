'use strict'

const app = require('./configs/app');
const mongoConfig = require('./configs/mongoConfig');
const port = 3000;

//Levantamos la conexión a la base de datos.
mongoConfig.init();

//Levantamos el servidor en el puerto 3000.
app.listen(port, ()=>{
    console.log(`Express | Server running on port ${port}`);
})