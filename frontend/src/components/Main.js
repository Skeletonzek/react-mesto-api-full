import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
  const user = React.useContext(CurrentUserContext);

  
  return (
    <main className="content">
    <section className="profile">
      <button className="profile__img-hover" onClick={props.onEditAvatar}>
        <img className="profile__img" src={user.avatar} alt="Аватар" />
      </button>
      <div className="profile-info">
        <h1 className="profile-info__name">{user.name}</h1>
        <button className="profile-info__change" type="button" onClick={props.onEditProfile}></button>
        <p className="profile-info__status">{user.about}</p>
      </div>
      <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
    </section>
    <section className="places">
      {props.cards.map((card) => (<Card key={card._id} _id={card._id} name={card.name} link={card.link} likes={card.likes} owner={card.owner} 
      onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />))}
  </section>
  </main>
  )
}

export default Main;