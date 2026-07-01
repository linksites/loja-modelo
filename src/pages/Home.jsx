import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTruck, FiRefreshCw, FiLock } from 'react-icons/fi'
import { MARCA } from '../lib/site'
import { PRODUTOS, CATEGORIAS } from '../lib/products'
import ProductCard from '../components/ProductCard'
import Button from '../components/ui/Button'

const VANTAGENS = [
  { icon: FiTruck, titulo: 'Frete grátis', texto: 'Acima de R$ 299 para todo o Brasil.' },
  { icon: FiRefreshCw, titulo: 'Troca fácil', texto: '30 dias para trocar ou devolver.' },
  { icon: FiLock, titulo: 'Compra segura', texto: 'Ambiente 100% protegido.' },
]

export default function Home() {
  const destaques = PRODUTOS.filter((p) => p.destaque).slice(0, 4)
  const categoriasReais = CATEGORIAS.filter((c) => c.id !== 'todos')

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block rounded-full bg-marca/10 px-4 py-1.5 text-sm font-semibold text-marca">
              Nova coleção
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-tinta md:text-6xl">
              {MARCA.slogan}
            </h1>
            <p className="mt-5 max-w-md text-lg text-tinta/70">
              {MARCA.descricao}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/catalogo">
                Ver catálogo <FiArrowRight aria-hidden="true" />
              </Button>
              <Button to="/produto/moletom-canguru" variant="outline">
                Destaque da semana
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="relative aspect-square overflow-hidden rounded-3xl bg-areia shadow-card"
          >
            <img
              src="https://picsum.photos/seed/loja-modelo-hero/900/900"
              alt="Vitrine da Loja Modelo"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="px-5 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 rounded-2xl border border-areia bg-white p-6 shadow-card sm:grid-cols-3">
          {VANTAGENS.map((v) => (
            <div key={v.titulo} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-marca/10 text-marca">
                <v.icon aria-hidden="true" className="text-xl" />
              </span>
              <div>
                <p className="font-semibold text-tinta">{v.titulo}</p>
                <p className="text-sm text-tinta/60">{v.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-6xl px-5 pt-16 md:px-8">
        <h2 className="font-display text-2xl font-bold text-tinta">
          Compre por categoria
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {categoriasReais.map((cat) => {
            const capa = PRODUTOS.find((p) => p.categoria === cat.id)
            return (
              <Link
                key={cat.id}
                to={`/catalogo?categoria=${cat.id}`}
                className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-areia p-5 shadow-card"
              >
                {capa && (
                  <img
                    src={capa.imagem}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-tinta/70 to-transparent" />
                <span className="relative font-display text-lg font-bold text-white">
                  {cat.label}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-6xl px-5 pt-16 md:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-tinta">Destaques</h2>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-1 text-sm font-semibold text-marca hover:underline"
          >
            Ver tudo <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {destaques.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      </section>
    </>
  )
}
