import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends Component {
  state = {
    carregando: true,
    userName: '',
  };

  componentDidMount() {
    this.recuperaNomeDeUsuario();
  }

  recuperaNomeDeUsuario = async () => {
    const user = await getUser();

    this.setState({ carregando: false, userName: user.name });
  };

  render() {
    const { carregando, userName } = this.state;

    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        {(carregando)
          ? <Carregando />
          : (<h2 data-testid="header-user-name">{ userName }</h2>)}
      </header>
    );
  }
}
