import { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    albuns: [],
    artista: '',
    backupArtista: '',
    carregando: false,
    pesquisou: false,
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

  pesquisaArtista = () => {
    const { artista } = this.state;
    const backupArtista = artista;

    this.setState({ carregando: true }, () => {
      searchAlbumsAPI(artista)
        .then((resposta) => this.setState({
          albuns: resposta,
          artista: '',
          backupArtista,
          carregando: false,
          pesquisou: true,
        }));
    });
  };

  render() {
    const { albuns, backupArtista, carregando, pesquisou } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {(carregando)
          ? <Carregando />
          : (
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
                  onClick={ this.pesquisaArtista }
                  data-testid="search-artist-button"
                >
                  Pesquisar
                </button>
              </label>
            </form>
          )}
        {(pesquisou)
          ? <AlbumCard albuns={ albuns } backupArtista={ backupArtista } />
          : null}
      </div>
    );
  }
}

export default Search;
