import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [btnIsDisable, setBtnIsDisable] = useState(true);
  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");


  


  // Funcion para tomar valores de los inputs y guardarlos en los states name y about
  function handleOnChangeInput(event) {
    const {name, value} = event.target
    if (name === "name") {
      setName(value);
      if(value.length < 2){
        setNameError("El nombre debe tener al menos 2 caracteres");
      } else{
        setNameError("");
      }
    } else {
      setAbout(value);
      if(value.length < 2){
        setAboutError("La descripción debe tener al menos 2 caracteres");
      }else {
        setAboutError("");
      }
    }
  }

  //Despues de cargar el usuario actual desde la API sus datos serán usados en componentes gestionados.

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);


  //funcion para habilitar boton del formulario

  useEffect(()=>{
    setBtnIsDisable(!name || !about || name.length < 2 || about.length < 2 );
  },[name, about]);

  function handleSubmit(event) {
    event.preventDefault();

    //Limpiar inputs
    setName("");
    setAbout("");

    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      name={"edit"}
      isOpen={isOpen}
      title={"Editar Perfil"}
      onClose={onClose}
    >
      <form
        className="formulary"
        id="formulary-profile"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="formulary__data"
          id="name-profile"
          type="text"
          placeholder="Nombre"
          minLength="2"
          maxLength="21"
          name="name"
          required
          onChange={handleOnChangeInput}
          value={name}
        />
        <span className="name-profile-error">{nameError}</span>
        <input
          className="formulary__data"
          id="about-me"
          type="text"
          placeholder="Acerca de mi"
          minLength="2"
          maxLength="30"
          name="about"
          required
          onChange={handleOnChangeInput}
          value={about}
        />
        <span className="about-me-error">{aboutError}</span>
        <button
          type="submit"
          className="formulary__save-button"
          id="btn-submit-profile"
          disabled={btnIsDisable}
        >
          Guardar
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
