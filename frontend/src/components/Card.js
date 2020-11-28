import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = props.owner === user._id;
  const isLiked = props.likes.some(i => i === user._id);
  const cardDeleteButtonClassName = `place__bin ${isOwn ? ' ' : 'place__bin_hidden'}`;
  const cardLikeButtonClassName = `place__like-button ${isLiked ? 'place__like-button_active' : ' '}`;

  function handleClick() {
    props.onCardClick(props.name, props.link);
  }

  
  function handleLikeClick() {
    props.onCardLike(props)
  }

  
  function handleDeleteClick() {
    props.onCardDelete(props._id)
  }

  return (
    <article className="place">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img className="place__photo" alt={props.name} src={props.link} onClick={handleClick} />
      <h2 className="place__title">{props.name}</h2>
      <div className="place__like">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        <span className="place__like-count">{props.likes.length}</span>
      </div>
    </article>
  )
}

export default Card;