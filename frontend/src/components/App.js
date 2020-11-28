import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import * as api from '../utils/api';
import userAvatarDefault from '../images/profile-img.jpg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { checkToken } from '../utils/auth';
import { register } from '../utils/auth';
import { authorize } from '../utils/auth';

function App() {
  const history = useHistory();
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState(true)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: null, link: null, open: false });
  const [currentUser, setCurrentUser] = React.useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: userAvatarDefault });
  const [loggedIn, setLogged] = React.useState(false);
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      checkToken(jwt)
        .then((res) => {
          loggedStatusYes(res.data.email);
          history.push('/');
        })
        .catch((err) => {
          console.error(`${err} - Переданный токен некорректен`);
        })
    }
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  function loggedStatusYes(email) {
    setLogged(true);
    setEmail(email);
  }

  function loggedStatusNo() {
    setLogged(false);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  
  function handleTooltip(status) {
    setTooltipOpen(true);
    setTooltipStatus(status);
  }

  function handleTooltipClose() {
    setTooltipOpen(false);
    if (tooltipStatus) {
      history.push('/sign-in');
    }
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);    
    setSelectedCard({ ...selectedCard, open: false });
  }

  function handleCardClick(name, link) {
    setSelectedCard({ name, link, open: true });
  }

  function handleUpdateUser(user) {
    api.sendUserInfo(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: avatar.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(id) {
    api.deleteCard(id).then(() => {
      
      const newCards = cards.filter((c) => c._id !== id);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.postNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(password, email) {
    register(password, email)
    .then((res) => {
      if (res) {
        handleTooltip(true);          
      }
    })
    .catch((err) => {
      handleTooltip(false); 
      console.error(`${err} - некорректно заполнено одно из полей`); 
    })
  }

  function handleLogin(password, email) {
    authorize(password, email)
    .then((res) => {
      if (res) {
        loggedStatusYes(email);
        api.getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
        api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
        history.push('/');
      }
    })
    .catch((err) => {
      handleTooltip(false);
      if (err === 400) {
        console.error(`${err} - не передано одно из полей`);
      }
      else {
        console.error(`${err} - пользователь с email не найден`);
      }
    })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    loggedStatusNo();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isTooltipOpen} onClose={handleTooltipClose} tooltipStatus={tooltipStatus} />
        <Header isLogged={loggedIn} email={email} onSignOut={handleSignOut}/>
        <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Route path="/sign-up"> 
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
