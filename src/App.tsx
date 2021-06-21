import { Button  } from "./components/Button"

function App() { // Todo componente ja tem um children que é o conteudo entre as tags
  return (
    <div>
  <Button text="Clique aqui 1" />
  <Button text=" Clique aqui 2"/>
  <Button>Conteudo/children</Button> 
    </div>
 
  );
}

export default App;
