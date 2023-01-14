import { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends Component {
  state = {
    carregando: true,
    loginName: '',
  };

  componentDidMount() {
    this.recuperaNomeUsuario();
  }

  recuperaNomeUsuario = () => {
    const { carregando } = this.state;
    getUser()
      .then((usuario) => {
        this.setState({
          carregando: !carregando,
          loginName: usuario.name,
        });
      });
  };

  render() {
    const { carregando, loginName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Trybe Tunes</h1>
        {
          (carregando)
            ? <Carregando />
            : <h2 data-testid="header-user-name">{ loginName }</h2>
        }
      </header>
    );
  }
}

export default Header;
