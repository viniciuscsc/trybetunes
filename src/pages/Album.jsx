import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

class Album extends Component {
  state = {
    carregando: true,
    musicas: [],
    musicasFavoritas: [],
  };

  async componentDidMount() {
    await this.buscaMusicasDoAlbum();
    const musicasFavoritas = await getFavoriteSongs();
    this.setState({ carregando: false, musicasFavoritas });
  }

  buscaMusicasDoAlbum = async () => {
    const { match: { params: { id } } } = this.props;

    getMusics(id)
      .then((response) => this.setState({ musicas: response }));
  };

  render() {
    const { carregando, musicas, musicasFavoritas } = this.state;
    const listaDeMusicas = musicas.filter((_musica, index) => index !== 0);

    return (
      <div data-testid="page-album">
        <Header />
        {(carregando)
          ? <Carregando />
          : (musicas.length > 0)
              && (
                <div>
                  <h3 data-testid="artist-name">{musicas[0].artistName}</h3>
                  <h3 data-testid="album-name">{musicas[0].collectionName}</h3>
                  {listaDeMusicas
                    .map((musica) => (
                      <MusicCard
                        key={ musica.trackId }
                        musica={ musica }
                        musicasFavoritas={ musicasFavoritas }
                      />))}
                </div>
              )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
