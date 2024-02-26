const { Router } = require('express');
const router = new Router();

var { getCategorias, insertarCategoria, editarCategoria, getCategoriasCombobox } = require('../controllers/categoria.controllers');

router.get('/getCategorias', getCategorias);
router.post('/insertarCategoria', insertarCategoria);
router.put('/editarCategoria', editarCategoria);
router.get('/categoriasCombobox', getCategoriasCombobox);

module.exports = router;
