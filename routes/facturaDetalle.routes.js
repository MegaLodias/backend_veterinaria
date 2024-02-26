const {Router} = require('express');
const router = new Router();

var { insertarDetalles, insertarFactura, actualizarFacttura, getFacturas, getFacturasDetalles, obtenerFacturaUsuario, getDetalles } = require('../controllers/facturaDetalle.controllers');

router.post('/insertarDetalle',insertarDetalles);
router.post('/insertarFactura', insertarFactura);
router.put('/actualizarFactura', actualizarFacttura);
router.post('/obtenerFacturaUsuario', obtenerFacturaUsuario);
router.get('/getFacturas', getFacturas);
router.post('/getDetalles', getDetalles);

router.get('/getFacturasDetalles', getFacturasDetalles);

module.exports = router; 