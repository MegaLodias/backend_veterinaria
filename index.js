const express = require('express');
const cors = require('cors'); // Importa la biblioteca cors
const app = express();

var usuario_routes = require('./routes/usuarios.routes');
var producto_routes = require('./routes/producto.routes');
var categoria_router = require('./routes/categoria.routes');
var envio_router = require('./routes/envio.routes');
var facturaDetalle_router = require('./routes/facturaDetalle.routes');
var produCate_router = require('./routes/produCatego.routes');
var cantones_router = require('./routes/cantones.routes');

app.use(cors()); // Esto permitirá todas las solicitudes desde cualquier origen

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas
app.use('/api', usuario_routes);
app.use('/api', producto_routes);
app.use('/api', categoria_router);
app.use('/api', envio_router);
app.use('/api', facturaDetalle_router);
app.use('/api', produCate_router);
app.use('/api', cantones_router);


// Levantar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});