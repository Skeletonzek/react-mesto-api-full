import React from 'react';
import statusOk from '../images/StatusOk.svg';
import statusBad from '../images/StatusBad.svg'

function InfoTooltip(props) {

  return (
    <section className={`popup popup-tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__form popup-tooltip__form">
      <button className="popup__close popup-tooltip__close" type="button" onClick={props.onClose}></button>
      <img className="popup-tooltip__status-img" alt="результат" src={props.tooltipStatus ? statusOk : statusBad}></img>
      <p className ="popup-tooltip__status-text">{props.tooltipStatus ? 'Вы успешно зарегистрировались!': 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
    </div>
  </section>
  )
}

export default InfoTooltip;