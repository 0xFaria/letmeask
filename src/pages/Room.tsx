import { useEffect } from "react"
import { FormEvent, useState } from "react"
import { useParams } from "react-router" // disponibiliza parametros da rota

import logoImg from "../assets/images/logo.svg"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { useAuth } from "../hooks/useAuth"
import { database } from "../services/firebase"

import "../styles/room.scss"

type RoomParams = {
  id: string
}

export function Room() {

  const {user} = useAuth()
  const params = useParams<RoomParams>() // os parametros da url ficarão aqui
  const [newQuestion, setNewQuestion] = useState("")
  const roomId = params.id

  useEffect(() => {
    
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.once("value", room => { // event listener. Mais de uma vez coloco "on"
      console.log(room.val()) // documentação firebase
    })
  }, [roomId]) // toda vez que o roomId mudar eu executo esse código dnv


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()
    if(newQuestion.trim() === "") {
      return
    }

      if(!user) {
        throw new Error("You must be logged in")
      }

      const question = { // todas as informações da pergunta
        content: newQuestion,
        author: {
          name: user.name,
          avatar: user.avatar
        },
        isHighlighted: false,
        isAnswered: false
      }

      await database.ref(`/rooms/${roomId}/questions`).push(question)

      setNewQuestion("")
  }
  
  return (
    <div id= "page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id}/>
        </div>
      </header>

      <main className="contet">
        <div className="room-title">
          <h1>Sala react</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
          placeholder="O que você quer perguntar?" 
          onChange={event => setNewQuestion(event.target.value)}
          value={newQuestion}
          />

          <div className="form-footer">
            { user ? ( // NO REACT, QUANDO TENHO IF E ELSE USO OPERADORES TERNÁRIOS
              <div className="user-info">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>Faça seu login</button></span>
            ) }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>   
  )
  
}