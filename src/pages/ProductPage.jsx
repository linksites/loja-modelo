import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight, FiShoppingBag, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { getProduto, PRODUTOS } from '../lib/products'
import { formatarPreco } from '../lib/format'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import QuantityStepper from '../components/ui/QuantityStepper'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'

export default function ProductPage() {
  const { id } = useParams()
  const produto = getProduto(id)
  const { adicionar } = useCart()
  const { abrirCarrinho } = useUI()
  const [quantidade, setQuantidade] = useState(1)

  if (!produto) return <NotFound />

  const temDesconto = produto.precoAntigo && produto.precoAntigo > produto.preco
  const relacionados = PRODUTOS.filter(
    (p) => p.categoria === produto.categoria && p.id !== produto.id,
  ).slice(0, 4)

  const adicionarAoCarrinho = () => {
    adicionar(produto.id, quantidade)
    abrirCarrinho()
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-28 md:px-8 md:pt-32">
      <nav className="mb-6 flex items-center gap-1 text-sm text-tinta/50">
        <Link to="/" className="hover:text-marca">
          Início
        </Link>
        <FiChevronRight aria-hidden="true" />
        <Link to="/catalogo" className="hover:text-marca">
          Catálogo
        </Link>
        <FiChevronRight aria-hidden="true" />
        <span className="text-tinta/80">{produto.nome}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-3xl bg-areia shadow-card"
        >
          <img
            src={produto.imagem.replace('/800/800', '/900/900')}
            alt={produto.nome}
            className="aspect-square w-full object-cover"
          />
        </motion.div>

        <div>
          {temDesconto && (
            <span className="inline-block rounded-full bg-marca px-3 py-1 text-xs font-semibold text-white">
              Oferta por tempo limitado
            </span>
          )}
          <h1 className="mt-3 font-display text-3xl font-extrabold text-tinta md:text-4xl">
            {produto.nome}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-tinta">
              {formatarPreco(produto.preco)}
            </span>
            {temDesconto && (
              <span className="text-lg text-tinta/40 line-through">
                {formatarPreco(produto.precoAntigo)}
              </span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-tinta/70">{produto.descricao}</p>

          {produto.tags?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {produto.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-areia px-3 py-1 text-xs font-semibold uppercase tracking-wide text-tinta/60"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper quantidade={quantidade} onChange={setQuantidade} />
            <button
              type="button"
              onClick={adicionarAoCarrinho}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-marca px-6 py-3.5 font-semibold text-white transition-colors hover:bg-marcaDark"
            >
              <FiShoppingBag aria-hidden="true" />
              Adicionar ao carrinho
            </button>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-tinta/60">
            <li className="flex items-center gap-2">
              <FiCheck aria-hidden="true" className="text-oceano" /> Em estoque —
              envio em até 2 dias úteis
            </li>
            <li className="flex items-center gap-2">
              <FiCheck aria-hidden="true" className="text-oceano" /> 30 dias para
              troca ou devolução
            </li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-tinta">
            Você também pode gostar
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {relacionados.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </div>
      )}

      <Link
        to="/catalogo"
        className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-marca hover:underline"
      >
        <FiArrowLeft aria-hidden="true" /> Voltar ao catálogo
      </Link>
    </section>
  )
}
