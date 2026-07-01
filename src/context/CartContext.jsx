import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { PRODUTOS } from '../lib/products'
import { FRETE_GRATIS_A_PARTIR_DE, VALOR_FRETE } from '../lib/site'

const CartContext = createContext(null)

const STORAGE_KEY = 'loja-modelo:carrinho'

// Estado = lista de itens { id, quantidade }. Os dados do produto vêm do
// catálogo, mantendo o carrinho enxuto e sempre sincronizado com o preço atual.
function reducer(state, action) {
  switch (action.type) {
    case 'adicionar': {
      const existente = state.find((i) => i.id === action.id)
      const qtd = action.quantidade ?? 1
      if (existente) {
        return state.map((i) =>
          i.id === action.id ? { ...i, quantidade: i.quantidade + qtd } : i,
        )
      }
      return [...state, { id: action.id, quantidade: qtd }]
    }
    case 'definirQuantidade': {
      const quantidade = Math.max(1, action.quantidade)
      return state.map((i) =>
        i.id === action.id ? { ...i, quantidade } : i,
      )
    }
    case 'remover':
      return state.filter((i) => i.id !== action.id)
    case 'limpar':
      return []
    default:
      return state
  }
}

// Carrega o carrinho salvo, descartando itens cujo produto não existe mais.
function init() {
  if (typeof window === 'undefined') return []
  try {
    const bruto = window.localStorage.getItem(STORAGE_KEY)
    if (!bruto) return []
    const salvo = JSON.parse(bruto)
    if (!Array.isArray(salvo)) return []
    return salvo.filter((i) => PRODUTOS.some((p) => p.id === i.id))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [itens, dispatch] = useReducer(reducer, undefined, init)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(itens))
    } catch {
      // Ignora ambientes sem localStorage (ex.: modo privado restrito).
    }
  }, [itens])

  const valor = useMemo(() => {
    // Enriquece cada item com os dados do produto para uso na UI.
    const detalhados = itens
      .map((i) => {
        const produto = PRODUTOS.find((p) => p.id === i.id)
        if (!produto) return null
        return {
          ...produto,
          quantidade: i.quantidade,
          subtotal: produto.preco * i.quantidade,
        }
      })
      .filter(Boolean)

    const totalItens = detalhados.reduce((s, i) => s + i.quantidade, 0)
    const subtotal = detalhados.reduce((s, i) => s + i.subtotal, 0)
    const frete =
      subtotal === 0 || subtotal >= FRETE_GRATIS_A_PARTIR_DE ? 0 : VALOR_FRETE
    const total = subtotal + frete

    return {
      itens: detalhados,
      totalItens,
      subtotal,
      frete,
      total,
      adicionar: (id, quantidade) => dispatch({ type: 'adicionar', id, quantidade }),
      definirQuantidade: (id, quantidade) =>
        dispatch({ type: 'definirQuantidade', id, quantidade }),
      remover: (id) => dispatch({ type: 'remover', id }),
      limpar: () => dispatch({ type: 'limpar' }),
    }
  }, [itens])

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de <CartProvider>')
  return ctx
}
