const express = require('express');
const router = express.Router();
const { musicas, playlists, artistas } = require('../db/data');

router.get('/musicas', (req, res) => {
  res.json(musicas);
});

router.get('/musicas/:id', (req, res) => {
  const musica = musicas.find(m => m.id === parseInt(req.params.id));
  if (!musica) {
    return res.status(404).json({ mensagem: 'Música não encontrada' });
  }
  res.json(musica);
});

router.post('/musicas', (req, res) => {
  const novaMusica = req.body;
  novaMusica.id = musicas.length + 1;

  const index = artistas.findIndex(a => a.id === novaMusica.artista);

  if (index === -1) {
      return res.status(404).json({ mensagem: 'Artista não existe cadastrado' });
  }

  musicas.push(novaMusica);
  res.status(201).json({ mensagem: 'Música criada com sucesso', musica: novaMusica });
});

router.put('/musicas/:id', (req, res) => {
  const musicaId = parseInt(req.params.id);
  const index = musicas.findIndex(m => m.id === musicaId);
  
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Música não encontrada' });
  }

  musicas[index] = { ...musicas[index], ...req.body };
  res.status(200).json({ mensagem: 'Música atualizada com sucesso', musica: musicas[index] });
});

router.delete('/musicas/:id', (req, res) => {
  const musicaId = parseInt(req.params.id);
  const index = musicas.findIndex(m => m.id === musicaId);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Música não encontrada' });
  }

  if (playlists.findIndex(p => p.musicas.includes(musicaId)) !== -1) {
    return res.status(404).json({ mensagem: 'Música não pode ser deletada, está associado a playlist(s)!' });
  }

  const musicaRemovida = musicas.splice(index, 1)[0];
  res.status(200).json({ mensagem: 'Música removida com sucesso', musica: musicaRemovida });
});

module.exports = router;