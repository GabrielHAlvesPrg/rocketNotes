import { useState } from 'react'; 
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Background } from './styles';

export function SignIn(){
  const [ email, setEmail ] = useState("");//Estou criando um estado inicial para essa propriedade.
  const [ password, setPassword ] = useState("");//Estou criando um estado inicial para essa propriedade.

  const { signIn } = useAuth();

  function handleSignIn(){
    signIn({ email, password})
  }
  
  return(
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seus login</h2>

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}//quando o conteúdo do input muda, coloco ele dentro do setEmail.
        />

        <Input 
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn} />

        <Link to="/register">
          Criar conta
        </Link>
      </Form>

      <Background />
    </Container>
  );
}