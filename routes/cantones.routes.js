const { Router } = require('express');
const router = new Router();

var { getCantones } = require('../controllers/cantones.controllers');

router.get('/cantones', getCantones );

module.exports = router;
