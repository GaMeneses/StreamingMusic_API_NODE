const express = require('express');
const cache = require('memory-cache');
const router = express.Router();
const { playlists, musicas } = require('../db/data');

router.get('/playlists', (req, res) => {
    res.json(playlists);
});

router.get('/playlists/:id', (req, res) => {
    const playlist = playlists.find(p => p.id === parseInt(req.params.id));
    if (!playlist) {
        return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }
    res.json(playlist);
});

router.post('/playlists', (req, res) => {
    const novaPlaylist = req.body;

    const ids = verificaMusicasNaoExistem(novaPlaylist.musicas);

    if (ids.length > 0) {
        return res.status(404).json({ mensagem: 'Não foi possível criar a playList, essa(s) musica(s) não existem!', musicas: ids });
    }

    novaPlaylist.id = playlists.length + 1; 
    playlists.push(novaPlaylist);
    res.status(201).json({ mensagem: 'Playlist criada com sucesso', playlist: novaPlaylist });
});

router.post('/playlists/:id/AdicionarMusica', (req, res) => {

    const playlistId = parseInt(req.params.id);
    const novasMusicas = req.body;
    const index = playlists.findIndex(p => p.id === playlistId);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }
  
    var ids = verificaMusicasNaoExistem(novasMusicas.musicas);

    if (ids.length > 0) {
        return res.status(404).json({ mensagem: 'Não foi possível inserir na playList, essa(s) musica(s) não existe(m)!', musicas: ids });
    }

    ids = verificaMusicasDaListaAtual(novasMusicas.musicas, playlists[index].musicas);

    if (ids.length > 0) {
        return res.status(404).json({ mensagem: 'Não foi possível inserir na playList, essa(s) musica(s) já existe(m)!', musicas: ids });
    }

    novasMusicas.musicas.forEach(id => {
        playlists[index].musicas.push(id);
    });
  
    res.status(201).json({ mensagem: 'Musicas inseridas na playlist', playlist: playlists[index] });
});

router.put('/playlists/:id', (req, res) => {
    const playlistId = parseInt(req.params.id);
    const index = playlists.findIndex(p => p.id === playlistId);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }

    playlists[index] = { ...playlists[index], ...req.body };
    res.status(200).json({ mensagem: 'Playlist atualizada com sucesso', playlist: playlists[index] });
});

router.delete('/playlists/:id', (req, res) => {
    const playlistId = parseInt(req.params.id);
    const index = playlists.findIndex(p => p.id === playlistId);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }

    const playlistRemovida = playlists.splice(index, 1)[0];
    res.status(200).json({ mensagem: 'Playlist removida com sucesso', playlist: playlistRemovida });
});

router.delete('/playlists/:id/RemoverMusica/:musica', (req, res) => {
    const playlistId = parseInt(req.params.id);
    const musicaId = parseInt(req.params.musica);
    const playlist = playlists.find(p => p.id === playlistId);

    if (!playlist) {
        return res.status(404).json({ mensagem: 'Playlist não encontrada' });
    }

    var indice = playlist.musicas.indexOf(musicaId);

    if (indice === -1) {
        return res.status(404).json({ mensagem: 'musica não encontrada na playlist' });
    }
       
    var musicaRemovida = playlist.musicas.splice(indice, 1);
    
    res.status(200).json({ mensagem: 'Musica removida da playlist com sucesso', musica: musicaRemovida });
});


function verificaMusicasNaoExistem(listaIds) {
    var naoExiste = [];

    listaIds.forEach(id => {
        if (musicas.findIndex(m => m.id === id) === -1) 
            naoExiste.push(id)
    });

    return naoExiste;
}

function verificaMusicasDaListaAtual(novalista, listaMusicas) {
    var existe = [];

    novalista.forEach(id => {
        if (listaMusicas.includes(id)) 
            existe.push(id)
    });

    return existe;
}

module.exports = router;