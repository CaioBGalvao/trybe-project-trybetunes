import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ArtistCard extends Component {
  render() {
    const {
      artistImage,
      artistAlbum,
      artistName,
      collectionId,
    } = this.props;
    return (
      <section>
        <img src={ artistImage } alt={ `Album do ${artistName}` } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <p>{artistAlbum}</p>

        </Link>
        <p>{artistName}</p>
      </section>
    );
  }
}

ArtistCard.propTypes = {
  collectionId: PropTypes.number.isRequired,
  artistImage: PropTypes.string.isRequired,
  artistAlbum: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
