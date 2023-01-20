import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    listaMusicas: [],
    nomeAlbum: '',
    nomeArtista: '',
  };

  componentDidMount() {
    this.acessaMusicasDoAlbum();
  }

  acessaMusicasDoAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const musicasAPI = await getMusics(id);
    const listaMusicas = musicasAPI.filter((_musica, index) => index !== 0);
    const nomeAlbum = musicasAPI[0].collectionName;
    const nomeArtista = musicasAPI[0].artistName;
    this.setState({
      listaMusicas,
      nomeAlbum,
      nomeArtista,
    });
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
            trackName={ trackName }
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        { this.renderizaMusicas() }
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
