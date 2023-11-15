const jwt = require('jsonwebtoken');

const gerarToken = (dadosUsuario) => {
  return jwt.sign(dadosUsuario, 'WebServices', { expiresIn: '1h' });
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, 'WebServices');;
  } catch (erro) {
    throw new Error('Token inválido');
  }
};

module.exports = { gerarToken, verificarToken };