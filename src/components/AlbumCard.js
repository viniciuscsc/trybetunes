import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { albuns, backupArtista } = this.props;

    if (albuns.length === 0) {
      return 'Nenhum álbum foi encontrado';
    }

    return (
      <>
        <h2>{`Resultado de álbuns de: ${backupArtista}`}</h2>
        {
          albuns.map((album) => (
            <div key={ album.collectionId }>
              <p>{ album.collectionName }</p>
              <p>{ album.artistName }</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                {album.collectionId}
              </Link>
            </div>))
        }
      </>
    );
  }
}

AlbumCard.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
  })).isRequired,
  backupArtista: PropTypes.string.isRequired,
};

export default AlbumCard;
