import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUTOS, CATEGORIAS } from '../lib/products'
import ProductCard from '../components/ProductCard'

const ORDENACOES = [
  { id: 'relevancia', label: 'Relevância' },
  { id: 'menor-preco', label: 'Menor preço' },
  { id: 'maior-preco', label: 'Maior preço' },
  { id: 'nome', label: 'Nome (A–Z)' },
]

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') || 'todos'
  const ordem = params.get('ordem') || 'relevancia'

  const atualizar = (chave, valor) => {
    const proximo = new URLSearchParams(params)
    if (valor && valor !== 'todos' && valor !== 'relevancia') {
      proximo.set(chave, valor)
    } else {
      proximo.delete(chave)
    }
    setParams(proximo, { replace: true })
  }

  const produtos = useMemo(() => {
    let lista =
      categoria === 'todos'
        ? [...PRODUTOS]
        : PRODUTOS.filter((p) => p.categoria === categoria)

    switch (ordem) {
      case 'menor-preco':
        lista.sort((a, b) => a.preco - b.preco)
        break
      case 'maior-preco':
        lista.sort((a, b) => b.preco - a.preco)
        break
      case 'nome':
        lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
        break
      default:
        break
    }
    return lista
  }, [categoria, ordem])

  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-28 md:px-8 md:pt-32">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-tinta md:text-4xl">
          Catálogo
        </h1>
        <p className="mt-2 text-tinta/60">
          {produtos.length}{' '}
          {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => {
            const ativo = c.id === categoria
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => atualizar('categoria', c.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  ativo
                    ? 'border-marca bg-marca text-white'
                    : 'border-tinta/15 bg-white text-tinta/70 hover:border-marca hover:text-marca'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        <label className="flex items-center gap-2 text-sm text-tinta/70">
          Ordenar por
          <select
            value={ordem}
            onChange={(e) => atualizar('ordem', e.target.value)}
            className="rounded-full border border-tinta/15 bg-white px-3 py-2 font-semibold text-tinta focus:border-marca focus:outline-none"
          >
            {ORDENACOES.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {produtos.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {produtos.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-areia bg-white p-10 text-center text-tinta/60">
          Nenhum produto nesta categoria.
        </p>
      )}
    </section>
  )
}
