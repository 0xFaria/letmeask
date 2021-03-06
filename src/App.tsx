
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { auth, firebase } from "./services/firebase"

import { AuthContextProvider } from "./contexts/AuthContext"
import { Room } from "./pages/Room"






function App() { // Todo componente ja tem um children que é o conteudo entre as tags
  return (
    <BrowserRouter>
      <AuthContextProvider >
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
