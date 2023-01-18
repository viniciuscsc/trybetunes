import { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    textoInput: '',
  };

  capturaTextoInput = ({ target: { value } }) => {
    const textoInput = value;
    this.setState({ textoInput });
  };

  habilitaBtnPesquisar = () => {
    const { textoInput } = this.state;
    const caracteresMinimos = 2;
    return textoInput.length < caracteresMinimos;
  };

  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist">
            {'Nome: '}
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.capturaTextoInput }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ this.habilitaBtnPesquisar() }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
