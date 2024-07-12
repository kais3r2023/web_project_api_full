import React,{useEffect, useState} from 'react'
import UserForm from './UserForm'
import InfoTooltip from './InfoTooltip'
import { useLocation, useNavigate } from 'react-router-dom'
import *as auth from '../utils/auth'

export default function Login({isUserLogged}) {
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const[successRegister, setSuccessRegister] = useState(false)
  const[shoulBeInfoOpen, setShouldBeInfoOpen] = useState(false)
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  // funcion para Cerrar Tooltip
  function closeInfoTooltip(){
    setShouldBeInfoOpen(false)
  }

  // funcion para abrir el Info Tooltip si el registro fue exitoso
  useEffect(()=>{
    if(location.state === 'success'){
      setSuccessRegister(true)
      setShouldBeInfoOpen(true)
    }
  },[location.state]);

  // Manipulacion del los valores de los inputs
  function handleChange(event){
    const {name, value} = event.target
    setUserCredentials({
      ...userCredentials, [name]: value
    })

  };

  //Manipulacion del submit del Formulario
  function handleSubmit(event){
    event.preventDefault()
    if(!userCredentials.email || !userCredentials.password){
      return 
    }
      auth
        .authorize(userCredentials.email, userCredentials.password)
        .then((data)=>{
          if(data.token){
            setUserCredentials({
              email: '',
              password: ''
            });
            isUserLogged();
            navigate('/');
          }
        })
        .catch((error)=> console.log(error));
    
  }

  return (
    <>
      <UserForm
        title={"Inicia sesión"}
        buttonText={"Inicia sesión"}
        linkSpanText={"¿Aun no eres miembro? Regístrate aqui"}
        linkSpan={"/signup"}
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <InfoTooltip
        isSuccess={successRegister}
        shoulBeInfoOpen={shoulBeInfoOpen}
        onClose={closeInfoTooltip}
      />
    </>
  )
}
