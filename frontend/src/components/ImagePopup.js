import closeIcon from "../images/Close Icon.png"

function ImagePopup ({name, link, isOpen, onClose}) {
  return (
    <div className={`template-zoom ${isOpen ? "pop-up__open" : ""}`} id="template-zoom">
    <div className="template-zoom__container">
      <img className="template-zoom__image" id="zoom-img-src" alt={name} src={link}/>
      <img className="template-zoom__close-icon btn-close" id="close-icon-zoom" alt="icono de cerrar zoom" src={closeIcon} onClick={onClose}/>
      <h4 className="template-zoom__title" id="zoom-img-title">{name}</h4>
    </div>
</div>
  )
}

export default ImagePopup
