import { createContext, useContext, useState } from 'react'

// Controla estados globais de interface — hoje, apenas a abertura do
// drawer (gaveta) do carrinho, compartilhado entre Header e páginas.
const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)

  const valor = {
    carrinhoAberto,
    abrirCarrinho: () => setCarrinhoAberto(true),
    fecharCarrinho: () => setCarrinhoAberto(false),
  }

  return <UIContext.Provider value={valor}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI deve ser usado dentro de <UIProvider>')
  return ctx
}
