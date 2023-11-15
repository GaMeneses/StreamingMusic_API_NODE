const { verificarToken } = require('../Util/token');

const middlewareAutenticacao = (req, res, next) => {

  if (req.path !== '/login') {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ mensagem: 'Token ausente' });
    }
    
    try {
      const dadosUsuario = verificarToken(token);
      req.usuario = dadosUsuario;
      next(); 
    } catch (erro) {
      return res.status(401).json({ mensagem: erro.message });
    }
  }else 
    next(); 
};

module.exports = middlewareAutenticacao;