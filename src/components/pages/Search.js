import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default class Search extends Component {
  render() {
    const {
      isSerchDisable,
      onClickArtistSerch,
      artistName,
      handleSerch,
      loadingArtists,
      artistSearched,
    } = this.props;

    const inputTag = (
      <input
        name="artistName"
        type="text"
        placeholder="Nome do Artista"
        data-testid="search-artist-input"
        value={ artistName }
        onChange={ handleSerch }
      />);

    return (
      <div data-testid="page-search">
        <h1>Pesquisa</h1>
        <form>
          <label htmlFor="artistName">
            {loadingArtists ? <Loading /> : inputTag}
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isSerchDisable }
            onClick={ onClickArtistSerch }
          >
            Pesquisar

          </button>
        </form>
        <h1>
          Resultado de álbuns de:
          { artistSearched }
        </h1>
        
      </div>
    );
  }
}

Search.propTypes = {
  artistSearched: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  isSerchDisable: PropTypes.bool.isRequired,
  loadingArtists: PropTypes.bool.isRequired,
  onClickArtistSerch: PropTypes.func.isRequired,
  handleSerch: PropTypes.func.isRequired,
};
