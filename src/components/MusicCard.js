import { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicas } = this.props;
    const listaDeMusicas = musicas.filter((_musica, index) => index !== 0);

    return (
      <div>
        {listaDeMusicas.map((musica) => (
          <div key={ musica.trackId }>
            <h3>{musica.trackName}</h3>
            <audio data-testid="audio-component" src={ musica.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicas: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  })).isRequired,
};

export default MusicCard;
