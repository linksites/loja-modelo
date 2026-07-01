import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2, FiX, FiShoppingBag } from 'react-icons/fi'
import { formatarPreco } from '../lib/format'
import { FRETE_GRATIS_A_PARTIR_DE } from '../lib/site'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import QuantityStepper from './ui/QuantityStepper'

/** Gaveta lateral do carrinho: revisão rápida dos itens antes do checkout. */
export default function CartDrawer() {
  const { carrinhoAberto, fecharCarrinho } = useUI()
  const { itens, subtotal, frete, total, definirQuantidade, remover } = useCart()
  const navigate = useNavigate()

  // Trava a rolagem do fundo e permite fechar com a tecla Esc.
  useEffect(() => {
    if (!carrinhoAberto) return
    document.body.classList.add('sem-scroll')
    const onKey = (e) => e.key === 'Escape' && fecharCarrinho()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('sem-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [carrinhoAberto, fecharCarrinho])

  const faltaParaFrete = FRETE_GRATIS_A_PARTIR_DE - subtotal

  const irParaCheckout = () => {
    fecharCarrinho()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {carrinhoAberto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fecharCarrinho}
            className="fixed inset-0 z-50 bg-tinta/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            role="dialog"
            aria-label="Carrinho de compras"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-nevoa shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-areia px-5 py-4">
              <h2 className="font-display text-lg font-bold text-tinta">
                Seu carrinho
              </h2>
              <button
                type="button"
                onClick={fecharCarrinho}
                aria-label="Fechar carrinho"
                className="grid h-9 w-9 place-items-center rounded-full text-tinta transition-colors hover:bg-areia"
              >
                <FiX aria-hidden="true" className="text-xl" />
              </button>
            </header>

            {itens.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-areia text-tinta/50">
                  <FiShoppingBag aria-hidden="true" className="text-2xl" />
                </span>
                <p className="text-tinta/70">Seu carrinho está vazio.</p>
                <Link
                  to="/catalogo"
                  onClick={fecharCarrinho}
                  className="font-semibold text-marca hover:underline"
                >
                  Explorar catálogo
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-areia overflow-y-auto px-5">
                  {itens.map((item) => (
                    <li key={item.id} className="flex gap-4 py-4">
                      <Link
                        to={`/produto/${item.id}`}
                        onClick={fecharCarrinho}
                        className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-areia"
                      >
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/produto/${item.id}`}
                            onClick={fecharCarrinho}
                            className="font-semibold leading-tight text-tinta hover:text-marca"
                          >
                            {item.nome}
                          </Link>
                          <button
                            type="button"
                            onClick={() => remover(item.id)}
                            aria-label={`Remover ${item.nome}`}
                            className="text-tinta/40 transition-colors hover:text-marca"
                          >
                            <FiTrash2 aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <QuantityStepper
                            quantidade={item.quantidade}
                            onChange={(q) => definirQuantidade(item.id, q)}
                            size="sm"
                          />
                          <span className="font-semibold text-tinta">
                            {formatarPreco(item.subtotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-areia px-5 py-5">
                  {faltaParaFrete > 0 ? (
                    <p className="mb-3 rounded-xl bg-areia/70 px-3 py-2 text-center text-xs text-tinta/70">
                      Faltam <strong>{formatarPreco(faltaParaFrete)}</strong> para
                      ganhar frete grátis!
                    </p>
                  ) : (
                    <p className="mb-3 rounded-xl bg-oceano/10 px-3 py-2 text-center text-xs font-semibold text-oceano">
                      Você ganhou frete grátis!
                    </p>
                  )}
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-tinta/70">
                      <span>Subtotal</span>
                      <span>{formatarPreco(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-tinta/70">
                      <span>Frete</span>
                      <span>{frete === 0 ? 'Grátis' : formatarPreco(frete)}</span>
                    </div>
                    <div className="flex justify-between pt-1 text-base font-bold text-tinta">
                      <span>Total</span>
                      <span>{formatarPreco(total)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={irParaCheckout}
                    className="mt-4 w-full rounded-full bg-marca px-6 py-3 font-semibold text-white transition-colors hover:bg-marcaDark"
                  >
                    Finalizar compra
                  </button>
                  <button
                    type="button"
                    onClick={fecharCarrinho}
                    className="mt-2 w-full rounded-full px-6 py-2 text-sm font-semibold text-tinta/60 transition-colors hover:text-marca"
                  >
                    Continuar comprando
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
