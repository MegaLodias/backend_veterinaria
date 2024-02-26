const { Router } = require('express');
const router = new Router();

var { insertarProdCate, editarProdCate, getProductosCategoria, insertarProdcuctosCategoria } = require('../controllers/produCatego.controllers');

router.post('/insertarProdCate', insertarProdCate);
router.post('/insertarProdcuctosCategoria', insertarProdcuctosCategoria);
router.put('/editarProdCate', editarProdCate);
router.get('/getProductoCategoria', getProductosCategoria);

module.exports = router;
