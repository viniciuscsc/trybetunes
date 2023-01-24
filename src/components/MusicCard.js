import { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    carregando: false,
    checked: false,
  };

  componentDidMount() {
    this.verificaSeEFavorita();
  }

  componentDidUpdate() {
    this.verificaSeEFavorita();
  }

  adicionaMusicaFavorita = async ({ target: { checked } }) => {
    const { musica } = this.props;
    this.setState({ carregando: true });
    if (checked) {
      await addSong(musica);
    }
    this.setState({ carregando: false });
  };

  verificaSeEFavorita = async () => {
    const { musica } = this.props;
    const musicasFavoritas = await getFavoriteSongs();
    if (musicasFavoritas.some((music) => music.trackId === musica.trackId)) {
      this.setState({ checked: true });
    }
  };

  renderizaCard = () => {
    const { musica: { previewUrl, trackId, trackName } } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onChange={ this.adicionaMusicaFavorita }
            checked={ checked }
          />
        </label>
      </div>
    );
  };

  render() {
    const { carregando } = this.state;
    return (
      <div>
        {(carregando)
          ? <Carregando />
          : this.renderizaCard()}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};
