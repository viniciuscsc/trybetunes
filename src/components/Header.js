import { Component } from 'react';
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
        {(carregando)
          ? <Carregando />
          : (<h2 data-testid="header-user-name">{ userName }</h2>)}
      </header>
    );
  }
}
