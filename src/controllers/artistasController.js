const express = require('express');
const cache = require('memory-cache');
const router = express.Router();
const { artistas, musicas } = require('../db/data');

router.get('/artistas',  (req, res) => {
    res.json(artistas);
});

router.get('/artistas/:id',  (req, res) => {
    const artista = artistas.find(a => a.id === parseInt(req.params.id));
    if (!artista) {
        return res.status(404).json({ mensagem: 'Artista não encontrado' });
    }
    res.json(artista);
});

router.post('/artistas',  (req, res) => {
    const novoArtista = req.body;
    novoArtista.id = artistas.length + 1;
    artistas.push(novoArtista);
    res.status(201).json({ mensagem: 'Artista criado com sucesso', artista: novoArtista });
});

router.put('/artistas/:id', (req, res) => {
    const artistaId = parseInt(req.params.id);
    const index = artistas.findIndex(a => a.id === artistaId);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Artista não encontrado' });
    }

    artistas[index] = { ...artistas[index], ...req.body };
    res.status(200).json({ mensagem: 'Artista atualizado com sucesso', artista: artistas[index] });
});

router.delete('/artistas/:id', (req, res) => {
    const artistaId = parseInt(req.params.id);
    const index = artistas.findIndex(a => a.id === artistaId);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Artista não encontrado' });
    }

    if (musicas.findIndex(m => m.artista === artistaId) !== -1) {
        return res.status(404).json({ mensagem: 'Artista não pode ser deletada, está associado a musica(s)!' });
      }

    const artistaRemovido = artistas.splice(index, 1)[0];
    res.status(200).json({ mensagem: 'Artista removido com sucesso', artista: artistaRemovido });
});

module.exports = router;