import React from 'react';

function AddPlacePopup(props) {
  const cardName = React.useRef();
  const cardSrc = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onSubmit({
      name: cardName.current.value,
      link: cardSrc.current.value
    });
    
  }

  React.useEffect(() => {
    if(props.isOpen) {
      cardName.current.value = "";
      cardSrc.current.value = "";
    }
  }, [props.isOpen])

  return (
    <section className={`popup popup-card ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__form popup-card__form" name="card" onSubmit={handleSubmit} noValidate>
        <button className="popup__close popup-card__close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title popup-card__title">Новое место</h2>
        <input ref={cardName} className="popup__text popup-card__text" id="title-input" type="text" name="name" placeholder="Название" minLength="1" maxLength="30" required />
        <span className="popup__error" id="title-input-error"></span>
        <input ref={cardSrc} className="popup__text popup-card__text" id="link-input" type="url" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__error" id="link-input-error"></span>
        <button className="popup__submit popup-card__submit" type="submit">Создать</button>
      </form>
    </section>
  )
}

export default AddPlacePopup;