import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/pages/Login';
import Search from './components/pages/Search';
import Album from './components/pages/Album';
import Favorites from './components/pages/Favorites';
import Profile from './components/pages/Profile';
import ProfileEdit from './components/pages/ProfileEdit';
import NotFound from './components/pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './components/pages/Loading';
import Header from './components/Header';
import searchAlbumAPI from './services/searchAlbumsAPI';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isButtomDisable: true,
      loading: false,
      hasbuttonClicked: false,
      isSerchDisable: true,
      artistName: '',
      loadingArtists: false,
      isResultArtistReady: false,
      resultArtistSearch: [],
      artistNameFixado: '',
    };
  }

  // funções do login inicio

  handleLogin = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { user } = this.state;
      const NUMBER_THREE = 3;
      if (user.length >= NUMBER_THREE) {
        this.setState({
          isButtomDisable: false,
        });
      }
    });
  }

  onClickLogin = async () => {
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser({ name: user });
    this.setState({ hasbuttonClicked: true });
  }
  // funções do login fim

  // funções da pesquisa do artista inicio

  handleSerch = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { artistName } = this.state;
      const NUMBER_TWO = 2;
      if (artistName.length >= NUMBER_TWO) {
        this.setState({
          isSerchDisable: false,
        });
      }
    });
  }

  onClickArtistSerch = async () => {
    const { artistName } = this.state;
    this.setState({
      loadingArtists: true,
      artistNameFixado: artistName,
    });
    const resultArtistSearch = await searchAlbumAPI(artistName);
    this.setState({
      artistName: '',
      resultArtistSearch,
      isResultArtistReady: true,
      loadingArtists: false,
    });
  }

  // funções da pesquisa do artista fim

  render() {
    const {
      user,
      isButtomDisable,
      loading,
      hasbuttonClicked,
      isSerchDisable,
      artistName,
      loadingArtists,
      isResultArtistReady,
      resultArtistSearch,
      artistNameFixado,
    } = this.state;

    const loginJSX = (<Login
      user={ user }
      isButtomDisable={ isButtomDisable }
      handleLogin={ this.handleLogin }
      onClickLogin={ this.onClickLogin }
    />);

    return (
      <Switch>
        <Route exact path="/">
          {loading ? <Loading /> : loginJSX}
          {hasbuttonClicked && <Redirect to="/search" />}
        </Route>
        <Route path="/search">
          <Header />
          <Search
            isSerchDisable={ isSerchDisable }
            artistName={ artistName }
            onClickArtistSerch={ this.onClickArtistSerch }
            loadingArtists={ loadingArtists }
            isResultArtistReady={ isResultArtistReady }
            handleSerch={ this.handleSerch }
            resultArtistSearch={ resultArtistSearch }
            artistNameFixado={ artistNameFixado }
          />
        </Route>
        <Route
          path="/album/:id"
          render={ (props) => (
            <>
              <Header />
              <Album
                { ...props }
              />
            </>
          ) }
        />
        <Route path="/favorites">
          <Header />
          <Favorites />
        </Route>
        <Route exact path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route exact path="/profile/edit">
          <Header />
          <ProfileEdit />
        </Route>
        <Route path="">
          <NotFound />
        </Route>
      </Switch>

    );
  }
}
