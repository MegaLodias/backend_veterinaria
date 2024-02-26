const { Router } = require('express');
const router = new Router();

var { crearUsuarios, updateUsuario, getUsuario, validarIngreso, obtenerDireccion, getUsuarios, getUsuariosDireccion } = require('../controllers/usuarios.controllers');

router.post('/crearUsuario', crearUsuarios);
router.post('/updateUsuario', updateUsuario);
router.post('/validarUsuarios', validarIngreso);
router.post('/obtenerDireccion', obtenerDireccion);
router.get('/getUsuario', getUsuario);
router.get('/getUsuarios', getUsuarios);
router.get('/getUsuariosDireccion', getUsuariosDireccion);


module.exports = router;
