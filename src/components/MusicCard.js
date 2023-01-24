import { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    carregando: false,
  };

  // componentDidMount() {
  //   this.verificaSeEFavorita();
  // }

  // componentDidUpdate() {
  //   this.verificaSeEFavorita();
  // }

  adicionaMusicaFavorita = async ({ target: { checked } }) => {
    const { trackId } = this.props;
    this.setState({ carregando: true });
    if (checked) {
      await addSong(trackId);
    }
    this.setState({ carregando: false });
  };

  // verificaSeEFavorita = async () => {
  //   const { trackId } = this.props;
  //   const musicasFavoritas = await getFavoriteSongs();
  //   if (musicasFavoritas.some((musica) => musica === trackId)) {
  //     this.setState({ checked: true });
  //   }
  // };

  renderizaCard = () => {
    const { checked, previewUrl, trackId, trackName } = this.props;
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
  checked: PropTypes.bool.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};
