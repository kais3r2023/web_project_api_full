import trashCan from "../images/Trash-Can.png";
import likeImg from "../images/like.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({card, name, link, likes, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  //Verificando si el id de la tarjeta es la del propietario

  const isOwn = card.owner._id === currentUser._id;

  // Variable para establecer ClassName si se muestra el icono de eliminar tarjeta

  const cardDeleteButtonClassName = `gallery__card_trash-can-icon ${
    isOwn ? "gallery__card_trash-can-icon" : "gallery__card_trash-can-icon_hidden"
  }`;

  
  // Verificacion si el usuario a dado Like a la tarjeta
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Variable para Establecer ClassName si se ha dado like
  const cardLikeButtonClassName = isLiked? 'black-like' : '';

  function handleClick() {
    onCardClick({ name, link });
  }

  function handleLikeClick(){
    onCardLike(card);
  }

  function handleDeleteClick(){
    onCardDelete(card);
  }

  return (
    <div className="card">
      <div className="gallery__card">
        <img
          className={cardDeleteButtonClassName}
          id="trash-can-img"
          alt="Tachito de Basura"
          src={trashCan}
          onClick={handleDeleteClick}
        />
        <img className="gallery__card_photo" src={link} onClick={handleClick} alt={`imagen de ${name}`}/>
        <div className="gallery__card_bar">
          <h3 className="gallery__card_bar-title">{name}</h3>
          <div>
            <img
              className={`gallery__card_bar-like ${cardLikeButtonClassName}`}
              alt="Corazon Like"
              src={likeImg}
              onClick={handleLikeClick}
            />
            <p className="gallery__card_bar-like-count" >
              {likes ? likes.length : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
