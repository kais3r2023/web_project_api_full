import React from "react";
import { Link } from "react-router-dom";

export default function UserForm({
  title,
  buttonText,
  linkSpanText,
  linkSpan,
  handleChange,
  onSubmit,
}) {
  return (
    <form className="userForm" onSubmit={onSubmit}>
      <h3 className="userForm__title">{title}</h3>
      <div className="userForm__input-container">
        <input
          className="userForm__input"
          type="email"
          placeholder="Correo electrónico"
          name="email"
          maxLength='32'
          minLength='8'
          onChange={handleChange}
          required
        />
        <input
          className="userForm__input"
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
          maxLength='30'
          minLength='8'
          required
        />
      </div>
      <button type="submit" className="userForm__submit-btn">
        {buttonText}
      </button>
      <Link to={linkSpan} className="userForm__span-text">
        {linkSpanText}
      </Link>
    </form>
  );
}
