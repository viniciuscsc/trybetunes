import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends Component {
  state = {
    carregando: false,
    loginName: '',
  };

  capturaTextoInput = ({ target }) => {
    const nome = target.value;

    this.setState({
      loginName: nome,
    });
  };

  habilitaBotaoEntrar = () => {
    const { loginName } = this.state;
    const caracteresMinimos = 3;

    return (loginName.length < caracteresMinimos);
  };

  criaNovoUsuario = () => {
    const { carregando, loginName } = this.state;
    const { history } = this.props;

    this.setState({ carregando: !carregando }, () => {
      createUser({ name: loginName })
        .then(() => history.push('/search'));
    });
  };

  render() {
    const { carregando } = this.state;

    return (
      <div data-testid="page-login">
        <h1>Trybe Tunes</h1>
        {(carregando)
          ? <Carregando />
          : (
            <form>
              <fieldset>
                <legend>Login</legend>
                <label htmlFor="loginName">
                  Nome:
                  <input
                    type="text"
                    id="loginName"
                    placeholder="Digite seu nome"
                    onChange={ this.capturaTextoInput }
                    data-testid="login-name-input"
                  />
                </label>
                <button
                  type="button"
                  disabled={ this.habilitaBotaoEntrar() }
                  onClick={ this.criaNovoUsuario }
                  data-testid="login-submit-button"
                >
                  Entrar
                </button>
              </fieldset>
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

export default Login;
