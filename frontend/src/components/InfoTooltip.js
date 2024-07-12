import React from "react";
import iconSuccess from "../images/success_message.png"
import iconError from "../images/error_message.png"
import iconClose from "../images/Close Icon.png"

export default function InfoTooltip({ 
  
  isSuccess, 
  shoulBeInfoOpen, 
  onClose
}) {

  const icon = isSuccess ? iconSuccess : iconError;
  const messagge = isSuccess 
      ?'¡Correcto! Ya estás registrado.'
      : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.';



  return (
    <div
    className={`infoTool__pop-up ${shoulBeInfoOpen ? "infoTool__pop-up__open" : ""}`}>
      <div className="infoTool__pop-up__container">

      <div className="infoTool">
        <img
          src={icon}
          className="infoTool__image"
          alt={"icono que indica el estado del registro"}
        />
        <p className="infoTool__text">{messagge}</p>
      </div>
      <img
          className="infoTool__btn-close"
          alt="icono de cerrar infoTool"
          src={iconClose}
          onClick={onClose}
        />
    </div>
    </div>
  );
}
