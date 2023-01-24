import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    carregando: false,
    listaMusicas: [],
    nomeAlbum: '',
    nomeArtista: '',
  };

  componentDidMount() {
    this.acessaMusicasDoAlbum();
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

  renderizaMusicas = () => {
    const { listaMusicas, nomeAlbum, nomeArtista } = this.state;
    return (
      <div>
        <h2 data-testid="artist-name">{ nomeArtista }</h2>
        <h3 data-testid="album-name">{ nomeAlbum }</h3>
        {listaMusicas.map((musica) => (
          <MusicCard
            key={ musica.trackId }
            musica={ musica }
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
