import { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    carregando: false,
    // checked: false,
  };

  // componentDidMount() {
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

  verificaSeEFavorita = () => {
    // acessa o id da musica
    const { trackId } = this.props;

    // acessa o local storage
    const musicasFavoritas = JSON.parse(localStorage.getItem('favorite_songs'));

    // verifica se o id é igual ao de algum id das musicas do LS
    return musicasFavoritas.some((musica) => musica === trackId);
    // se algum é igual, atualiza o estado checked para true

    // senao, mantem o estado false
  };

  renderizaCard = () => {
    const { previewUrl, trackId, trackName } = this.props;
    // const { checked } = this.state;
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
            checked={ this.verificaSeEFavorita() }
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
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};
