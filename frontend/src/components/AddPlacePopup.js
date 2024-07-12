import {React, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {

  function isValidURL(url) {
    try{
      new URL(url);
      return(true);
    } catch(error){
      
      return(false);
    }
  }

  const[ placeName, setPlaceName ] = useState("");
  const[ placeLink, setPlaceLink] = useState("");
  const isLinkValid = isValidURL(placeLink);
  const formIsValid = placeName.length > 2 && isLinkValid;
  


  //funcion para habilitar el boton submit
  
 
  function handleSubmit(event) {
    event.preventDefault();
    onAddPlaceSubmit({
      name: placeName,
      link: placeLink
    })    
  }
  
  function handleChange(event) {
    if(event.target.name === "name"){
      setPlaceName(event.target.value);
    } else{
      setPlaceLink(event.target.value);
    }
  }

  

  return (
    <PopupWithForm
      name={"place"}
      isOpen={isOpen}
      title={"Nuevo Lugar"}
      onClose={onClose}
    >
      <form 
        className="formulary" 
        id="formulary-place" 
        noValidate
        onSubmit={handleSubmit}
        >
        <input
          className="formulary__data"
          id="place-title"
          type="text"
          minLength="2"
          maxLength="30"
          name="name"
          placeholder="Título"
          required
          onChange={handleChange}
        />
        {placeName.length <2 ?
        <span className="place-title-error ">El nombre debe tener al menos 2 caracteres</span> : ""
        }
        <input
          className="formulary__data"
          id="photo-link"
          type="url"
          placeholder="Enlace a la imagen"
          name="link"
          required
          onChange={handleChange}
        />
        {!isValidURL(placeLink)?
        <span className="photo-link-error">La URL es inválida</span> : ""
        }
        <button
          type="submit"
          className="formulary__save-button"
          id="btn-place-save"
          disabled={!formIsValid}
        >
          Crear
        </button>
      </form>
    </PopupWithForm>
  );
}
