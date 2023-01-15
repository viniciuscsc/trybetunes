import { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
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
        <BrowserRouter>
          <div>
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </div>
          <div>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </div>
          <div>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </div>
        </BrowserRouter>
      </header>
    );
  }
}

export default Header;
