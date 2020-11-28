import React from 'react';

function EditAvatarPopup(props) {
  const imageSrc = React.useRef();
 
  function handleSubmit(e) {
    e.preventDefault();
  
    props.onSubmit({
      avatar: imageSrc.current.value
    });
  }

  React.useEffect(() => {
    if(props.isOpen) {
      imageSrc.current.value = "";
    }
  }, [props.isOpen])
  
  return (
    <section className={`popup popup-avatar ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__form popup-avatar__form" name="avatar" onSubmit={handleSubmit} noValidate>
        <button className="popup__close popup-avatar__close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title popup-avatar__title">Обновить аватар</h2>
        <input ref={imageSrc} className="popup__text popup-avatar__text" id="link-input" type="url" name="avatar" placeholder="Ссылка на картинку" required />
        <span className="popup__error" id="link-input-error"></span>
        <button className="popup__submit popup-avatar__submit" type="submit">Сохранить</button>
      </form>
    </section>
  )
}

export default EditAvatarPopup;