import React, { useState } from 'react'
import UserForm from './UserForm'
import * as auth from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import InfoTooltip from '../components/InfoTooltip'

export default function Register(

) {

  const navigate = useNavigate();

  // States
  const[successRegister, setSuccessRegister] = useState(false)
  const[shoulBeInfoOpen, setShouldBeInfoOpen] = useState(false)
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  // funcion para Cerrar Tooltip
  function closeInfoTooltip(){
    setShouldBeInfoOpen(false)
  }
  // Funcion para guardar informacion del formulario
  function handleChange(event){
    const {name, value} = event.target;
    setUserCredentials({
      ...userCredentials, [name]: value }
    )
  }
  // Manipulacion del Submit del formulario
  function handleSubmit(event){
    event.preventDefault();
    auth
      .register(userCredentials.email, userCredentials.password)
      .then((data)=>{
        if(data){
          navigate('/signin', { state : 'success'});
        } else{
          setShouldBeInfoOpen(true);
          setSuccessRegister(false);
        }
      })
  }

  return (
    <>
    <UserForm
      title={"Regístrate"}
      buttonText={"Regístrate"}
      linkSpanText={"¿Ya eres miembro? Inicia sesión aquí"}
      linkSpan={"/signin"}
      handleChange={handleChange}
      onSubmit={handleSubmit}
    />
    <InfoTooltip
      isSuccess={successRegister}
      shoulBeInfoOpen={shoulBeInfoOpen}
      onClose={closeInfoTooltip}
    />
    </>
  )
}

