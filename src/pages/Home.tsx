import illustrationImg from "../assets/images/illustration.svg" /// toda importação por dentro do componente
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import "../styles/auth.scss"


export function Home() { // componente sempre com letra maiuscula
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
          <button className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala  com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="">
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <button type="submit">Entrar na sala</button>
          </form>
        </div>
      </main>

    </div>
  )
}