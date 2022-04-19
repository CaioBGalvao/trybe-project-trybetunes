import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ArtistCard extends Component {
  render() {
    const {
      artistImage,
      artistAlbum,
      artistName,
    } = this.props;
    return (
      <section>
        <img src={ artistImage } alt={ `Album do ${artistName}` } />
        <p>{artistAlbum}</p>
        <p>{artistName}</p>
      </section>
    );
  }
}

ArtistCard.propTypes = {
  artistImage: PropTypes.string.isRequired,
  artistAlbum: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
