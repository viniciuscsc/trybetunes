import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    carregando: false,
    listaMusicas: [],
    musicasFavoritas: [],
    nomeAlbum: '',
    nomeArtista: '',
  };

  async componentDidMount() {
    this.acessaMusicasDoAlbum();
    const musicasFavoritas = await getFavoriteSongs();
    this.setState({ musicasFavoritas });
  }

  async componentDidUpdate() {
    const musicasFavoritas = await getFavoriteSongs();
    this.setState({ musicasFavoritas });
  }

  acessaMusicasDoAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ carregando: true });
    const musicasAPI = await getMusics(id);
    const listaMusicas = musicasAPI.filter((_musica, index) => index !== 0);
    const nomeAlbum = musicasAPI[0].collectionName;
    const nomeArtista = musicasAPI[0].artistName;
    this.setState({
      carregando: false,
      listaMusicas,
      nomeAlbum,
      nomeArtista,
    });
  };

  verificaSeEFavorita = (trackId) => {
    const { musicasFavoritas } = this.state;
    return musicasFavoritas.some((musica) => musica === trackId);
  };

  renderizaMusicas = () => {
    const { listaMusicas, nomeAlbum, nomeArtista } = this.state;
    return (
      <div>
        <h2 data-testid="artist-name">{ nomeArtista }</h2>
        <h3 data-testid="album-name">{ nomeAlbum }</h3>
        {listaMusicas.map(({ previewUrl, trackId, trackName }) => (
          <MusicCard
            key={ trackId }
            previewUrl={ previewUrl }
            trackId={ trackId }
            trackName={ trackName }
            checked={ this.verificaSeEFavorita(trackId) }
          />
        ))}
      </div>
    );
  };

  render() {
    const { carregando } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {(carregando)
          ? <Carregando />
          : this.renderizaMusicas() }
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
