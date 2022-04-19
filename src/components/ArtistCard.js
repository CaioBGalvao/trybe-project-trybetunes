import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

export default class ArtistCard extends Component {
  render() {
    const {
      artistImage,
      artistAlbum,
      artistName,
      collectionId,
    } = this.props;
    return (
      <section 
      data-testid={ `link-to-album-${collectionId}` }
      onClick={  }
      >
        <img src={ artistImage } alt={ `Album do ${artistName}` } />
        <p>{artistAlbum}</p>
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
