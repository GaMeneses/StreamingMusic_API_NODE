const express = require('express');
const router = express.Router();
const { gerarToken } = require('../Util/token');
const { usuarios } = require('../db/data');

router.post('/login', (req, res) => {
   var usuario = req.body;

    usuarioAutenticado = verificarAcesso(usuario.login, usuario.password);
    if(usuarioAutenticado){
        const token = gerarToken(usuarioAutenticado);
        return res.json({ token });
    }

    return res.status(401).json({ mensagem: 'Login ou senha incorretos!' });
});

const verificarAcesso = (login, password) => {

    const usuario = usuarios.find(usu => usu.login === login && usu.password === password);

    if (usuario) {
      return usuario;
    } else {
      return null;
    }
};
  

module.exports = router;