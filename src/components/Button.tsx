type ButtonProps = {
  text?: string,
  children?:string
}

export function Button(props: ButtonProps) { // todas as propriedades enviadas como componente sao recebidas aqui como argumento
  return(
    <button>{props.text || "default"}</button>
  )
}

// named export