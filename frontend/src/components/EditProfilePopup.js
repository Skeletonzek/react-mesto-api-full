import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      name,
      about: description,
    });
  } 

  return (
    <section className={`popup popup-profile ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__form popup-profile__form" name="profile" onSubmit={handleSubmit} noValidate>
        <button className="popup__close popup-profile__close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title popup-profile__title">Редактировать профиль</h2>
        <input className="popup__text popup-profile__text" value={name} onChange={handleNameChange} id="name-input" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="popup__error" id="name-input-error"></span>
        <input className="popup__text popup-profile__text" value={description} onChange={handleDescriptionChange} id="status-input" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="popup__error" id="status-input-error"></span>
        <button className="popup__submit popup-profile__submit" type="submit">Сохранить</button>
      </form>
    </section>
  )
}

export default EditProfilePopup;