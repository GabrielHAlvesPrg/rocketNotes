import { createContext, useContext, useState, useEffect } from "react";

import { api } from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [ data, setData ] = useState({});

  async function signIn({ email, password }){
    //Essa é uma função de autentificação.
    try{
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);
      

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`; //Estou inserindo um token do tipo Bearer, de autorização do cabeçalho, por padrão de todas as requisições.
      
      setData({ user, token});

    } catch (error) {
      if(error.response){
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  function signOut(){
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }){
    try {

      if(avatarFile){
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });
      alert("Perfil atualizado.")

    }catch (error) {
      if(error.response){
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if( token && user){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user) //Peguei os dados do usuário, que estavam armazenados em formato de texto e voltei ele para um objeto tipo json.
      })
    }

  }, []);

  // Neste caso o children é todas as rotas da aplicação, pois o AuthProvider esta envolvendo as Routes, lá no main.jsx.
  return (
    <AuthContext.Provider value={{ 
      signIn,
      signOut,
      updateProfile,
      user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){ // Isso é um Hooks
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };