import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      favIsChecked: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { favRecovered, albumSongs } = this.props;
    console.log('Musicas Recuperados do Local Storage', favRecovered);
    console.log('Objecto recuperado da API', albumSongs);
    const isFavoriteSongExist = favRecovered
      .some((favSongs) => favSongs.trackId === albumSongs.trackId);
    console.log('Se tiver favoritas isso deve estar true', isFavoriteSongExist);
    if (isFavoriteSongExist === true) {
      this.setState({
        favIsChecked: true,
      });
    }
  }

  checkboxVerificator = async ({ target }) => {
    const { albumSongs } = this.props;
    const { checked } = target;
    if (checked === true) {
      this.setState({
        loading: true,
      });
      await addSong(albumSongs);
      this.setState({
        loading: false,
        favIsChecked: true,
      });
    } else {
      this.setState({
        loading: true,
      });
      await removeSong(albumSongs);
      this.setState({
        loading: false,
        favIsChecked: false,
      });
    }
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const {
      loading,
      favIsChecked,
    } = this.state;

    const favoriteCheckBoxLabel = (
      <label
        htmlFor="favIsChecked"
      >
        Favorita
        <input
          data-testid={ `checkbox-music-${trackId}` }
          name="favIsChecked"
          type="checkbox"
          checked={ favIsChecked }
          onChange={ this.checkboxVerificator }
        />
      </label>);

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
        { loading ? <Loading /> : favoriteCheckBoxLabel }
      </section>
    );
  }
}

MusicCard.propTypes = {
  favRecovered: PropTypes.arrayOf(PropTypes.object).isRequired,
  albumSongs: PropTypes.shape.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
