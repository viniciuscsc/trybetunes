import { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    carregando: false,
    musicasFavoritas: [],
  };

  componentDidMount() {
    this.acessaMusicasFavoritas();
  }

  async componentDidUpdate() {
    const favoritasLocalStorage = await getFavoriteSongs();
    this.setState({ musicasFavoritas: favoritasLocalStorage });
  }

  acessaMusicasFavoritas = async () => {
    this.setState({ carregando: true });
    const favoritasLocalStorage = await getFavoriteSongs();
    this.setState({ carregando: false });
    this.setState({ musicasFavoritas: favoritasLocalStorage });
  };

  renderizaMusicasFavoritas = () => {
    const { musicasFavoritas } = this.state;
    return (
      <div>
        <h2>Músicas Favoritas</h2>
        {musicasFavoritas.map((musica) => (
          <MusicCard
            key={ musica.trackId }
            musica={ musica }
          />
        ))}
      </div>
    );
  };

  render() {
    const { carregando } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {(carregando)
          ? <Carregando />
          : this.renderizaMusicasFavoritas()}
      </div>
    );
  }
}
