import { Container } from './styles'

export function Input({icon: Icon, ...rest}){// icon:Icon - estou fazendo uma conversão do icon para Icon, para utiliza-lo como um componente. 
  return(
    <Container>
      {Icon && <Icon size={20}/>}
      <input {...rest} />
    </Container>
  )
}