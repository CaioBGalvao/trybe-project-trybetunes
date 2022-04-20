import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default class Search extends Component {
  render() {
    const {
      isSerchDisable,
      onClickArtistSerch,
      artistName,
      handleSerch,
      loadingArtists,
      resultArtistSearch,
      isResultArtistReady,
      artistNameFixado,
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

    const constMap = (
      <>
        <h1>
          {`Resultado de álbuns de: ${artistNameFixado}`}
        </h1>
        {resultArtistSearch.map((result, index) => (
          <section key={ index }>
            <img src={ result.artworkUrl100 } alt={ `Album do ${result.artistName}` } />
            <Link
              to={ `/album/${result.collectionId}` }
              data-testid={ `link-to-album-${result.collectionId}` }
            >
              <p>{result.collectionName}</p>

            </Link>
            <p>{artistNameFixado}</p>
          </section>

        ))}
      </>);

    const constH1NaoEncontrado = (<h1>Nenhum álbum foi encontrado</h1>);

    const albuns = (
      <div>
        {resultArtistSearch.length > 0 ? constMap : constH1NaoEncontrado }
      </div>);

    return (
      <div data-testid="page-search">
        <h1>Pesquisa</h1>
        <form>
          <label htmlFor="artistName">
            {loadingArtists ? <Loading /> : inputTag}
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSerchDisable }
            onClick={ onClickArtistSerch }
          >
            Pesquisar

          </button>
        </form>
        {isResultArtistReady ? albuns : <div /> }
      </div>
    );
  }
}

Search.propTypes = {
  resultArtistSearch: PropTypes.arrayOf(PropTypes.object).isRequired,
  artistName: PropTypes.string.isRequired,
  artistNameFixado: PropTypes.string.isRequired,
  isResultArtistReady: PropTypes.bool.isRequired,
  isSerchDisable: PropTypes.bool.isRequired,
  loadingArtists: PropTypes.bool.isRequired,
  onClickArtistSerch: PropTypes.func.isRequired,
  handleSerch: PropTypes.func.isRequired,
};
