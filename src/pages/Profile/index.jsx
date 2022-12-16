import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText';

import { Container, Form, Avatar } from "./styles";

export function Profile(){
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordNew, setPasswordNew] = useState();
  const [passwordOld, setPasswordOld] = useState();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder; //Se o usuário tem um avatar, vou acessar o endereço base da api/files/nome da imagem.

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);// esse estado, serve para carregar a nova imagem, selecionada pelo usuário.
  
  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  async function handleUpdate(){
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    };

    const userUpdated = Object.assign(user, updated); //Object.assign - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

    await updateProfile({ user: userUpdated, avatarFile });
  }

  function handleChangeAvatar(event){
    const file = event.target.files[0]; //vou extrair o arquivo, pegando ele do alvo do evento na primeira posição, pois quero um arquivo só.
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return(
    <Container>
      <header>
        <button type='button' onClick={handleBack}>
          <FiArrowLeft />
        </button> 
      </header>
      
      <Form>
        <Avatar>

          <img 
            src={avatar}
            alt="Foto do usuário" 
          />

          <label htmlFor="avatar">
            <FiCamera />

            <input 
              id="avatar" 
              type="file" 
              onChange={handleChangeAvatar}
            />

          </label>

        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate} />

      </Form>
    </Container>
  )
}