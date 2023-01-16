import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  state = {
    carregando: false,
    musicaFavorita: false,
  };

  adicionaMusicaFavorita = async (objetoMusica, event) => {
    const { target: { checked } } = event;
    this.setState({ carregando: true });
    if (checked) await addSong(objetoMusica);
    this.setState({ carregando: false, musicaFavorita: checked });
  };

  render() {
    const { musica } = this.props;
    const { carregando, musicaFavorita } = this.state;
    return (
      <div>
        {(carregando)
          ? <Carregando />
          : (
            <div>
              <h3>{musica.trackName}</h3>
              <audio data-testid="audio-component" src={ musica.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label
                htmlFor="favoritas"
              >
                Favorita
                <input
                  type="checkbox"
                  id="favoritas"
                  onChange={ () => this.adicionaMusicaFavorita(musica, event) }
                  checked={ musicaFavorita }
                  data-testid={ `checkbox-music-${musica.trackId}` }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
