import {React, useContext, useRef, useState} from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'



function EditAvatarPopup({onClose, isOpen, onUpdateAvatar }) {

  const [btnIsDisable, setBtnIsDisable] = useState(true);
  const [urlErrorMessage, setUrlErrorMessage] = useState("")

  // crear un estado que pueda modificar el boton habilitarlo y deshabilitarlo cuando sea o no valido la Url

  function isValidURL(url) {
    try{
      new URL(url);
      return(true);
    } catch(error){
      
      return(false);
    }
  }
 
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(currentUser?.avatar ?? "");
  
  function handleSubmit(event){
    event.preventDefault()

    const newAvatar = avatarRef.current.value;

    if(isValidURL(newAvatar)){

    onUpdateAvatar({avatar: avatarRef.current.value});
    }
  }

  // funcion para modificar el estado activo o inactivo del boton del formulario


  function handleInputChange(){
    const newAvatar = avatarRef.current.value;
    if(!isValidURL(newAvatar)){
      setUrlErrorMessage("La Url es inválida");
    }else{
      setUrlErrorMessage("");
    }
    setBtnIsDisable(!isValidURL(newAvatar));
  }

  return (
    <PopupWithForm
        name={"Avatar"}
        isOpen={isOpen}
        title={"Cambiar Foto De Perfil"}
        onClose={onClose}
      >
        <form
          className="formulary"
          id="formulary-update-avatar-icon"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            className="formulary__data"
            id="photo-avatar"
            type="url"
            placeholder="Enlace de la nueva foto de perfil"
            name="link"
            required
            ref={avatarRef}
            onChange={handleInputChange}
          />
          <span className="photo-avatar-error">{urlErrorMessage}</span>
          <button
            type="submit"
            className="formulary__save-button"
            id="btn-update-save"
            disabled={btnIsDisable}
          >
            Guardar
          </button>
        </form>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;
