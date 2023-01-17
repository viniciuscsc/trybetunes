import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

export default class Login extends Component {
  state = {
    carregando: false,
    valorDoInput: '',
  };

  capturaValorDoInput = ({ target: { value } }) => {
    const valorDoInput = value;

    this.setState({ valorDoInput });
  };

  habilitaBtnEntrar = () => {
    const { valorDoInput } = this.state;
    const minimoDeCaracteres = 3;

    return (valorDoInput.length < minimoDeCaracteres);
  };

  acaoDoBtnEntrar = async () => {
    const { valorDoInput } = this.state;
    const { history } = this.props;

    this.setState({ carregando: true });
    await createUser({ name: valorDoInput });
    history.push('/search');
  };

  render() {
    const { carregando } = this.state;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        {(carregando)
          ? <Carregando />
          : (
            <form>
              <label htmlFor="login-name">
                { 'Nome: ' }
                <input
                  data-testid="login-name-input"
                  type="text"
                  id="login-name"
                  onChange={ this.capturaValorDoInput }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ this.habilitaBtnEntrar() }
                onClick={ this.acaoDoBtnEntrar }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
