import { Container } from "./styles";

export function Button({ title, loading = false, ...rest }){

  return(
    <Container
     type="button"
     disabled={loading} //se o loading for verdadeiro vai desabilitar.
     {...rest}
    >
      {loading ? 'Carregando...' : title}
    </Container>
  )
}