import { FormEvent, useContext } from "react"
import { useHistory } from "react-router-dom"
import { auth, database, firebase } from "../services/firebase"


import illustrationImg from "../assets/images/illustration.svg" /// toda importação por dentro do componente
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import { Button } from "../components/Button"

import "../styles/auth.scss"
import { AuthContext } from "../contexts/AuthContext"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"


export function Home() { // componente sempre com letra maiuscula
  const history = useHistory() // Use/hook tem que estar sempre dentro do componente
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState("")


  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push("/rooms/new")
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if(roomCode.trim() === "") {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get() // VERIFICA SE TEM  DADOS COM ESSE ID

    if(!roomRef.exists()) {
      alert("Room does not exists")
      return
    }
    history.push(`/rooms/${roomCode}`)
  }
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas" />
        <strong>Crie salas de Q&amp;A ao vivo! </strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala  com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="" onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}