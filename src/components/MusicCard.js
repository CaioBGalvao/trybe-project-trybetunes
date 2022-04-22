import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      favIsChecked,
      checkboxVerificator,
    } = this.props;
    return (
      <section>
        <hr />
        <h2>{ trackName }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor="favIsChecked"
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita

          <input
            name="favIsChecked"
            type="checkbox"
            value={ favIsChecked }
            onChange={ checkboxVerificator }
          />
        </label>

      </section>
    );
  }
}

MusicCard.propTypes = {
  checkboxVerificator: PropTypes.func.isRequired,
  favIsChecked: PropTypes.bool.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
