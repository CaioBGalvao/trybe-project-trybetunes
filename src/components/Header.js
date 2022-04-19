import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imagem from '../images/TrybeTunesLogo.svg';
import { getUser } from '../services/userAPI';
import Loading from './pages/Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
      hasNameLoaded: false,
    };
  }

  componentDidMount() {
    this.renderName();
  }

  renderName = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      userName: user.name,
      hasNameLoaded: true,
      loading: false,
    });
  }

  render() {
    const { userName, loading, hasNameLoaded } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          <img src={ imagem } alt="logo TybeTunes" />
        </div>
        {loading && <Loading />}
        {hasNameLoaded && <div data-testid="header-user-name">{ userName }</div>}
        <nav>
          <Link to="/search" data-testid="link-to-search"> Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </nav>
      </header>
    );
  }
}
