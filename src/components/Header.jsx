import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { MARCA } from '../lib/site'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'

const LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/catalogo', label: 'Catálogo' },
]

/** Header fixo: logo, navegação e botão do carrinho com contador. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { totalItens } = useCart()
  const { abrirCarrinho } = useUI()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-nevoa/90 backdrop-blur-md border-b border-areia'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-tinta text-white">
            <FiShoppingBag aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-tight text-tinta">
            {MARCA.nome.split(' ')[0]}
            <span className="text-marca">.</span>
            <span className="text-tinta/60">{MARCA.nome.split(' ')[1]}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `text-sm font-semibold uppercase tracking-widest transition-colors hover:text-marca ${
                    isActive ? 'text-marca' : 'text-tinta/70'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={abrirCarrinho}
          aria-label={`Abrir carrinho com ${totalItens} ${
            totalItens === 1 ? 'item' : 'itens'
          }`}
          className="relative inline-flex items-center gap-2 rounded-full border border-tinta/15 bg-white px-4 py-2 text-sm font-semibold text-tinta transition-colors hover:border-marca hover:text-marca"
        >
          <FiShoppingBag aria-hidden="true" />
          <span className="hidden sm:inline">Carrinho</span>
          {totalItens > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-marca px-1 text-xs font-bold text-white">
              {totalItens}
            </span>
          )}
        </button>
      </nav>
    </motion.header>
  )
}
