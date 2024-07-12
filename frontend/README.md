# Tripleten web_project_around_auth
Proyecto React con Rutas y Autenticación

Este proyecto es una aplicación web construida con React, que incluye rutas protegidas y manejo de autenticación. A continuación, se describen las tecnologías utilizadas y su uso en el proyecto.
Tecnologías Utilizadas
React

React es una biblioteca de JavaScript para construir interfaces de usuario. En este proyecto, React se utiliza para crear los componentes de la aplicación y gestionar el estado.

    Componentes: La aplicación está dividida en varios componentes (Footer, Header, Main, etc.) que se encargan de diferentes partes de la UI.
    Estado: Se utiliza useState y useEffect para manejar el estado y los efectos secundarios dentro de los componentes.

React Router

React Router es una colección de componentes de navegación que se utilizan en las aplicaciones de React para gestionar la navegación y las rutas.

    Rutas: Se utiliza Routes y Route para definir las diferentes rutas de la aplicación (/, /signin, /signup).
    Navegación: useNavigate se utiliza para redirigir a los usuarios a diferentes rutas programáticamente.

Context API

Context API de React se utiliza para manejar el estado global en la aplicación.

    CurrentUserContext: Se crea un contexto para manejar el estado del usuario actual y hacerlo accesible en todos los componentes que lo necesiten.

API

Se realizan llamadas a una API para obtener y enviar datos.

    api: Un módulo personalizado (../utils/api) que contiene funciones para interactuar con la API (por ejemplo, defaultProfile, getCards, updateProfile, etc.).

Autenticación

Se maneja la autenticación de usuarios mediante un módulo personalizado.

    auth: Un módulo personalizado (../utils/auth) que contiene funciones para manejar la autenticación (por ejemplo, getToken).

Hooks

Se utilizan hooks para manejar el estado y los efectos secundarios.

    useState: Para manejar el estado local dentro de los componentes.
    useEffect: Para realizar efectos secundarios como la carga de datos y el manejo de tokens de autenticación.

JSX

JSX es una extensión de JavaScript que permite escribir HTML dentro de JavaScript. Se utiliza en todos los componentes para definir la estructura de la UI.
CSS

El diseño y el estilo de la aplicación se manejan mediante CSS.
Descripción del Código

El código define el componente principal App, que gestiona el estado de la aplicación y las rutas. A continuación, se destacan algunas funciones y su propósito:

    Carga de datos: useEffect se utiliza para cargar el perfil del usuario y las tarjetas desde la API al montar el componente.
    Autenticación: Se verifica el token almacenado en localStorage y se redirige al usuario según el estado de autenticación.
    Manejo de Popups: Funciones como handleEditAvatarClick, handleEditProfileClick y handleAddPlaceClick gestionan la apertura y cierre de popups.
    Actualizar Usuario y Avatar: handleUpdateUser y handleUpdateAvatar envían los datos actualizados a la API y actualizan el estado local.
    Manejo de Tarjetas: handleCardLike, handleCardDelete y handleAddPlaceSubmit gestionan las interacciones del usuario con las tarjetas (likes, eliminación, adición).

Este README proporciona una visión general de las tecnologías utilizadas y cómo se integran en la aplicación. Para más detalles, revise el código fuente y los comentarios dentro del mismo.