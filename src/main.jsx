import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { UIProvider } from './context/UIContext.jsx'
import './index.css'

// HashRouter: rotas por hash (#/produto/...) funcionam em hospedagem
// estática (GitHub Pages) sem configuração de servidor nem 404 ao recarregar.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </CartProvider>
    </HashRouter>
  </React.StrictMode>,
)
