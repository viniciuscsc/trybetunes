import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    albuns: [],
    backupNomeArtista: '',
    buscandoAlbuns: false,
    nomeArtista: '',
    pesquisouArtista: false,
  };

  capturaNomeArtista = ({ target: { value } }) => {
    const nomeArtista = value;
    this.setState({ nomeArtista });
  };

  habilitaBtnPesquisar = () => {
    const { nomeArtista } = this.state;
    const caracteresMinimos = 2;
    return nomeArtista.length < caracteresMinimos;
  };

  pesquisaAlbuns = async () => {
    const { nomeArtista } = this.state;
    this.setState({
      backupNomeArtista: nomeArtista,
      buscandoAlbuns: true,
      pesquisouArtista: false,
    });
    const albuns = await searchAlbumsAPI(nomeArtista);
    this.setState({
      albuns,
      buscandoAlbuns: false,
      nomeArtista: '',
      pesquisouArtista: true,
    });
  };

  renderizaFormularioPesquisa = () => (
    <div>
      <form>
        <label htmlFor="search-artist">
          {'Nome: '}
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.capturaNomeArtista }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ this.habilitaBtnPesquisar() }
          onClick={ this.pesquisaAlbuns }
        >
          Pesquisar
        </button>
      </form>
    </div>);

  renderizaAlbuns = () => {
    const { albuns, backupNomeArtista } = this.state;
    if (albuns.length === 0) {
      return (<p>Nenhum álbum foi encontrado</p>);
    }
    return (
      <div>
        <h2>{ `Resultado de álbuns de: ${backupNomeArtista}` }</h2>
        {albuns.map(({ artworkUrl100, collectionId, collectionName }) => (
          <div key={ collectionId }>
            <h3>{ collectionName }</h3>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <img src={ artworkUrl100 } alt={ `Capa do album ${collectionName}` } />
            </Link>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { buscandoAlbuns, pesquisouArtista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {buscandoAlbuns
          ? <Carregando />
          : this.renderizaFormularioPesquisa()}
        {pesquisouArtista
          ? this.renderizaAlbuns()
          : null}
      </div>
    );
  }
}
