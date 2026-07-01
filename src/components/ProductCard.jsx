import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { formatarPreco } from '../lib/format'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'

/** Cartão de produto usado na vitrine (grade do catálogo). */
export default function ProductCard({ produto }) {
  const { adicionar } = useCart()
  const { abrirCarrinho } = useUI()

  const temDesconto = produto.precoAntigo && produto.precoAntigo > produto.preco

  const adicionarAoCarrinho = () => {
    adicionar(produto.id, 1)
    abrirCarrinho()
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-areia bg-white shadow-card"
    >
      <Link
        to={`/produto/${produto.id}`}
        className="relative block aspect-square overflow-hidden bg-areia"
      >
        <img
          src={produto.imagem}
          alt={produto.nome}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {temDesconto && (
          <span className="absolute left-3 top-3 rounded-full bg-marca px-3 py-1 text-xs font-semibold text-white">
            Oferta
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/produto/${produto.id}`} className="flex-1">
          <h3 className="font-display text-lg font-semibold leading-tight text-tinta transition-colors group-hover:text-marca">
            {produto.nome}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-tinta">
              {formatarPreco(produto.preco)}
            </span>
            {temDesconto && (
              <span className="text-sm text-tinta/40 line-through">
                {formatarPreco(produto.precoAntigo)}
              </span>
            )}
          </div>
        </Link>

        <button
          type="button"
          onClick={adicionarAoCarrinho}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-tinta px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-marca"
        >
          <FiShoppingBag aria-hidden="true" />
          Adicionar
        </button>
      </div>
    </motion.article>
  )
}
