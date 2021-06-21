import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render( // Executado apenas uma vez
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);