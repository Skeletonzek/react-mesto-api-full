import React from 'react';

function ImagePopup(props) {

  return (
    <section className={`popup popup-pic ${props.card.open ? 'popup_opened' : ''}`}>
    <figure className="popup-pic__figure">
      <button className="popup__close popup-pic__close" type="button" onClick={props.onClose}></button>
      <img className="popup-pic__img" alt={props.card.name} src={props.card.link} />
      <figcaption className="popup-pic__title">{props.card.name}</figcaption>
    </figure>
  </section>
  )
}

export default ImagePopup;