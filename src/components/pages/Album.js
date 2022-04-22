import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, addSong, removeSong } from '../../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      allSongs: [],
      albumImg: '',
      favIsChecked: false,
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { match: { params: { id } } } = this.props;
    const allSongs = await getMusics(id);
    const albumImg = allSongs[0].artworkUrl100;
    const albumName = allSongs[0].collectionName;
    const albumArtist = allSongs[0].artistName;
    console.log('fetch', albumImg);
    this.setState({
      allSongs,
      albumImg,
      albumName,
      albumArtist,
    });
  }

  checkboxVerificator = async ({ target }) => {
    const { favIsChecked } = this.state;
    favIsChecked ? addSong()
  }

  render() {
    const { allSongs, albumImg, albumName, albumArtist, favIsChecked } = this.state;

    return (
      <div data-testid="page-album">
        <section>
          <img
            src={ albumImg }
            alt={ `Foto do album ${albumName}` }
          />
          <p data-testid="album-name">{ albumName }</p>
          <p data-testid="artist-name">{ albumArtist }</p>
        </section>
        {allSongs.slice(1).map((albumSongs, index) => (<MusicCard
          key={ index }
          trackName={ albumSongs.trackName }
          previewUrl={ albumSongs.previewUrl }
          trackId={ albumSongs.trackId }
          favIsChecked={ favIsChecked }
          checkboxVerificator={ this.checkboxVerificator }
        />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

Album.defaultProps = {
  match: null,
};
