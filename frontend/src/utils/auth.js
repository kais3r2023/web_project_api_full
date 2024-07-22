const baseUrl = 'https://kais3r.chickenkiller.com';

/* const baseUrl = 'http://localhost:8001'; */

export const register = (email, password)=>{
  return fetch(`${baseUrl}/signup`,{
    method: "POST",
    headers:  {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    }),
  })

  .then((res)=>{
      if(res.ok){
        return res.json();
      } else{
        return Promise.reject(res.status); //si el registro tiene un error muestra el estatus
      }
  })
  .catch((error) =>{
    console.log(`Error: ${error}`)  //Manejo del error
  })
};


export const authorize = (email, password) =>{
 return fetch(`${baseUrl}/signin`,{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body :    JSON.stringify({email, password })
 })
  .then ((res)=> {return res.json()})
  .then((data)=>{
    if(data.token){
      localStorage.setItem('jwt', data.token); //guardar Token en el navegador
      return data;
    } 
  })
  .catch((error)=>{
    return (console.log(`Error: ${error}`)) // Manejo del error
  })
};

export const getUserById = (token)=>{
  return fetch(`${baseUrl}/users/me`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res)=>{
      return (res.json())})
    .then((data)=>{
      return data
    })
    .catch((error)=>{
      return (console.log(error))
    })
};