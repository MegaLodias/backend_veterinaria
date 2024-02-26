const { Router } = require('express');
const router = new Router();

var { getProdcuctos, insertarProdcuctos, editarProdcuctos, buscarProdcuctosNombre, buscarProdcuctosCategoria } = require('../controllers/producto.controllers');

router.get('/getProductos', getProdcuctos);
router.post('/insertarProductos', insertarProdcuctos);
router.put('/editarProductos', editarProdcuctos);
router.post('/buscarProductosNombre', buscarProdcuctosNombre);
router.post('/buscarProductosCategoria', buscarProdcuctosCategoria);

module.exports = router;
