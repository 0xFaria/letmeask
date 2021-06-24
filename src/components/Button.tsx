import { ButtonHTMLAttributes } from "react"

import "../styles/button.scss"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
export function Button(props: ButtonProps) { // todas as propriedades enviadas como componente sao recebidas aqui como argumento
  return (
    <button className="button" {...props} />
  )
}