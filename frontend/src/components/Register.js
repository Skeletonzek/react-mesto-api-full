import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const email = React.useRef();
  const password = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(password.current.value, email.current.value);
  }
  
  return (
    <section className="sign sign-up">
      <form className="sign__form sign-up__form" name="sign-up" onSubmit={handleSubmit} noValidate>
        <h2 className="sign__title sign-up__title">Регистрация</h2>
        <input ref={email} className="sign__text sign-up__text"  id="email-input" type="email" name="email" placeholder="Email" minLength="2" maxLength="40" required />
        <input ref={password} className="sign__text sign-up__text" id="password-input" type="password" name="password" placeholder="Пароль" minLength="2" maxLength="200" required />
        <button className="sign__submit sign-up__submit" type="submit">Зарегистрироваться</button>
        <p className="sign-up__alrdy-user">Уже зарегестрированы?&nbsp;
          <Link to="/sign-in" className="sign-up__enter">Войти</Link>
        </p>
      </form>
    </section>
  )
}

export default Register;