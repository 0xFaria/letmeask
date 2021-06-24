import { createContext, ReactNode, useEffect, useContext, useState } from "react"
import { auth, firebase } from "../services/firebase"

type User = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>
}


type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType) // formato do q vou armazenar


export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => { // Efeito colateral
    const unsubscribe = auth.onAuthStateChanged(user => {  // event listener. Dentro de useeffect é reomendando retornar descadastro de event listener
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error("Missing informantion from Google Account")
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, []) //segundo parametro eu coloco o q precisa mudar pra eu fazer o efeito colateral. Vazio, ele roda quando abro o app

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider) // abra login do google como popup

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error("Missing informantion from Google Account")
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }


  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}