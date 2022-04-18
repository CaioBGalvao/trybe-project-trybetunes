import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Search from './components/pages/Search';
import Album from './components/pages/Album';
import Favorites from './components/pages/Favorites';
import Profile from './components/pages/Profile';
import ProfileEdit from './components/pages/ProfileEdit';
import NotFound from './components/pages/NotFound';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isButtomDisable: true,
    };
  }

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

  render() {
    const {
      user,
      isButtomDisable,
    } = this.state;
    return (
      <>
        <Route exact path="/">
          <Login
            user={ user }
            isButtomDisable={ isButtomDisable }
            handleLogin={ this.handleLogin }
          />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/album/:id">
          <Album />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/profile/edit">
          <ProfileEdit />
        </Route>
        <Route path="">
          <NotFound />
        </Route>
      </>

    );
  }
}
