import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    carregando: false,
    usuario: {},
  };

  componentDidMount() {
    this.recuperaInfoUsuario();
  }

  recuperaInfoUsuario = async () => {
    const usuario = await getUser();
    this.setState({ usuario });
  };

  renderizaDadosUsuario = () => {
    const { usuario: { description, email, image, name } } = this.state;
    return (
      <div>
        { 'Nome: ' }
        <p>{ name }</p>
        { 'Email: ' }
        <p>{ email }</p>
        { 'Descrição: ' }
        <p>{ description }</p>
        <img data-testid="profile-image" src={ image } alt={ `Imagem de ${name}` } />
        <br />
        <br />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  };

  render() {
    const { carregando } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {(carregando)
          ? <Carregando />
          : this.renderizaDadosUsuario()}
      </div>
    );
  }
}
