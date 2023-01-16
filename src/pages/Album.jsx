import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musicas: [],
  };

  async componentDidMount() {
    await this.buscaMusicasDoAlbum();
  }

  buscaMusicasDoAlbum = async () => {
    const { match: { params: { id } } } = this.props;

    getMusics(id)
      .then((response) => this.setState({ musicas: response }));
  };

  render() {
    const { musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {(musicas.length > 0)
          && (
            <div>
              <p data-testid="artist-name">{musicas[0].artistName}</p>
              <p data-testid="album-name">{musicas[0].collectionName}</p>
              <MusicCard musicas={ musicas } />
            </div>) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
