const usuarios = [
    { id: 1, login: 'admin', password: 'admin' }
];

const musicas = [
    { id: 1, titulo: 'Música 1', artista: 1, duracao: '4:30' },
    { id: 2, titulo: 'Música 2', artista: 2, duracao: '3:45' }
];
  
const playlists = [
    { id: 1, nome: 'Playlist 1', musicas: [1, 2] }
];
 
const artistas = [
    { id: 1, nome: 'Artista 1' },
    { id: 2, nome: 'Artista 2' }
];

module.exports = {usuarios, musicas, playlists, artistas};