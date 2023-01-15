import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artista: '',
  };

  capturaTextoInput = ({ target }) => {
    const nomeArtista = target.value;

    this.setState({
      artista: nomeArtista,
    });
  };

  habilitaBotaoEntrar = () => {
    const { artista } = this.state;
    const caracteresMinimos = 2;

    return (artista.length < caracteresMinimos);
  };

  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchArtist">
            <input
              type="text"
              id="searchArtist"
              placeholder="Digite o nome do artista"
              onChange={ this.capturaTextoInput }
              data-testid="search-artist-input"
            />
            <button
              type="button"
              disabled={ this.habilitaBotaoEntrar() }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
