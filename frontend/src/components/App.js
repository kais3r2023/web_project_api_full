import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import *as auth from "../utils/auth"


function App() {
  // Carga de States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  //Llamada de datos de Usuario de la Api
  useEffect(() => {
    api.defaultProfile().then((fetchedUser) => {
      setCurrentUser(fetchedUser);
    });
  }, []);

  // Funcion que atrapa el Token('jwt') del localStorage 

  useEffect(()=>{
    const storedToken = localStorage.getItem('jwt');
    if(storedToken){
      auth 
        .getToken(storedToken)
        .then((data)=>{
            if(data){
              setIsLogged(true);
              setEmailUser(data.email);
              setToken(storedToken);
              navigate('/')
            } else{
              navigate('/signup')
              throw new Error('Token invalido')
            }
        })
        .catch((error)=>{
          console.log(error);
          navigate('/signup')
        })
    }
  },[isLogged, navigate]);

  // Funcion de Cerrar sesion

  function signOff(){
    localStorage.removeItem('jwt')
    setEmailUser("")
    setToken(null);    
  }

  //Handler states Array de Cards
  useEffect(() => {
    api.getCards().then((arrayApiCards) => {
      setCards(arrayApiCards);
    });
  }, []);

  // Funciones para cambiar los States de Popups
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmationClick() {
    setIsConfirmationPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  function handlerCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function handleUpdateUser(dataUser) {
    api.updateProfile(dataUser).then((res) => {
      setCurrentUser(res);
    });
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data).then((res) => {
      setCurrentUser(res);
    });
    setIsEditAvatarPopupOpen(false);
  }

  //Funcion para cambiar el estado de la aplicacion a Logueado
  function handleLogin(){
    setIsLogged(true)
  }

  // Funcion para controlar los likes y dislikes
  function handleCardLike(card) {
    // verificacion si la tarjeta ha sido dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Peticion a la API para obtener datos actualizados de la tarjeta

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  // Funcion para eliminar tarjetas

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((res) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  //Funcion para agregar tarjetas

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
    });
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route element={<ProtectedRoute loggedIn={isLogged} />}>
            <Route
              path="/"
              element={
                <>
                  <Header
                    signText={"Cerrar sesión"}
                    emailLogin={emailUser}
                    onClick={signOff}
                    routeLink={'/signin'}
                  />
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onConfirmationClick={handleConfirmationClick}
                    onCardClick={handlerCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    isOpen={[
                      isEditProfilePopupOpen,
                      isAddPlacePopupOpen,
                      isEditAvatarPopupOpen,
                      isConfirmationPopupOpen,
                    ]}
                    onClose={closeAllPopups}
                    selectedCard={selectedCard}
                    cards={cards}
                  />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                </>
              }
            />
          </Route>
          <Route
            path="/signin"
            element={
              <>
                <Header 
                signText={"Regístrate"} 
                routeLink={"/signup"}
                />
                <Login 
                  isUserLogged={handleLogin}
                />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header 
                signText={"Inicia Sesión"}
                routeLink={"/signin"}
                />
                <Register />
              </>
            }
          />
        </Routes>

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
