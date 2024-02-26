const { Router }= require('express');
const router =  new Router();

var { generarEnvio, actualizarEnvio, actualizarObservacion, cambiarEstado, getEnvios, actualizarEnviosFecha } = require('../controllers/envio.controllers');

router.post('/generarEnvio', generarEnvio);
router.post('/actualizarEnvioFecha', actualizarEnviosFecha);
router.put('/actualizarEnvio', actualizarEnvio);
router.put('/actualizarObservacion', actualizarObservacion);
router.put('/cambiarEstado', cambiarEstado);
router.get('/getEnvios', getEnvios);
module.exports = router;

