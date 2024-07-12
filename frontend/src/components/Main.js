import { React, useContext } from "react";
import addButton from "../images/Add Button.png";
import editButton from "../images/Edit Button.png";
import PopupWithForm from "./PopupWithForm.js";
import Card from "./Card.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  isOpen,
  selectedCard,
  onClose,
  onCardDelete,
  onCardLike,
  cards,
}) {
  const [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isConfirmationPopupOpen,
  ] = isOpen;

  // Declarada variable Actual Usuario
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section>
        <div className="profile">
          <div id="avatarContent">
            <div
              className="profile__avatar-overlay"
              id="btnUpdateProfileIcon"
              onClick={onEditAvatarClick}
            ></div>
            <img
              className="profile__avatar"
              id="profileAvatar"
              alt="Avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            />
          </div>
          <div className="profile__content">
            <h1 className="profile__content-name">{currentUser.name}</h1>
            <button className="profile__content-edit-button">
              <img
                id="btnEdit"
                alt="Button Edit"
                src={editButton}
                onClick={onEditProfileClick}
              />
            </button>
            <h3 className="profile__content-subtitle">{currentUser.about}</h3>
          </div>
          <button
            className="add-button-place"
            id="add-button-place"
            onClick={onAddPlaceClick}
          >
            <img
              className="profile__add-button"
              id="btnAddPlace"
              alt="Add Button"
              src={addButton}
            />
          </button>
        </div>
      </section>
      <section className="gallery" id="gallery">
        {cards.map((dataCard) => (
          <Card
            key={`card-${dataCard._id}`}
            card={dataCard}
            name={dataCard.name}
            link={dataCard.link}
            likes={dataCard.likes}
            _id={dataCard._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>

      <PopupWithForm
        name={"confirmation"}
        isOpen={isConfirmationPopupOpen}
        title={"¿Estás Seguro?"}
        onClose={onClose}
      >
        <form className="formulary">
          <button
            type="button"
            className="formulary__save-button"
            id="btn-confirmation"
          >
            Si
          </button>
        </form>
      </PopupWithForm>

      <ImagePopup
        name={selectedCard?.name || ""}
        link={selectedCard?.link || ""}
        isOpen={!!selectedCard}
        onClose={onClose}
      />
    </>
  );
}

export default Main;
