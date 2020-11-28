import React from 'react';
import {useLocation, Link } from 'react-router-dom';
import headerLogo from '../images/mesto.svg';

function Header(props) {
  const currentPath = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__container">
        {props.isLogged && <p className="header__user">{props.email}</p>}
        {!props.isLogged && <Link to={currentPath.pathname === `/sign-in` ? `/sign-up` : `/sign-in`} className="header__sign">{currentPath.pathname === `/sign-in` ? `Регистрация` : `Вход`}</Link>}
        {props.isLogged && <Link to="/sign-in" className="header__sign" onClick={props.onSignOut}>Выйти</Link>}
      </div>
    </header>
  )
}

export default Header;