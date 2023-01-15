import { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musicas: [],
  };

  componentDidMount() {
    this.buscaMusicasDoAlbum();
  }

  buscaMusicasDoAlbum = () => {
    const { match: { params: { id } } } = this.props;

    getMusics(id)
      .then((resposta) => this.setState({ musicas: resposta }));
  };

  render() {
    const { musicas } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <p>{musicas[0].artistName}</p>
        <p>{musicas[0].collectionName}</p>
      </div>
    );
  }
}

export default Album;
