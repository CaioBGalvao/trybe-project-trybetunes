import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imagem from '../../images/TrybeTunesLogo.svg';

export default class Login extends Component {
  render() {
    const {
      user,
      isButtomDisable,
      handleLogin,
      onClickLogin,
    } = this.props;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <img src={ imagem } alt="logo TybeTunes" />
        <form>
          <label htmlFor="user">
            <input
              data-testid="login-name-input"
              name="user"
              type="text"
              placeholder="Name"
              value={ user }
              onChange={ handleLogin }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isButtomDisable }
            onClick={ onClickLogin }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  isButtomDisable: PropTypes.bool.isRequired,
};
