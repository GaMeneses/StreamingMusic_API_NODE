const express = require('express');
const router = express.Router();
const musicaController = require('./src/controllers/musicaController');
const acessoController = require('./src/controllers/acessoController');
const artistaController = require('./src/controllers/artistasController');
const playlistsController = require('./src/controllers/playlistsController');

router.use('/', musicaController);
router.use('/', acessoController);
router.use('/', artistaController);
router.use('/', playlistsController);

module.exports = router;