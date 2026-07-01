import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLock, FiArrowLeft } from 'react-icons/fi'
import { formatarPreco } from '../lib/format'
import { useCart } from '../context/CartContext'

const CAMPOS = [
  { nome: 'nome', label: 'Nome completo', tipo: 'text', grupo: 1 },
  { nome: 'email', label: 'E-mail', tipo: 'email', grupo: 1 },
  { nome: 'telefone', label: 'Telefone', tipo: 'tel', grupo: 1 },
  { nome: 'cep', label: 'CEP', tipo: 'text', grupo: 2 },
  { nome: 'endereco', label: 'Endereço', tipo: 'text', grupo: 2, full: true },
  { nome: 'cidade', label: 'Cidade', tipo: 'text', grupo: 2 },
  { nome: 'estado', label: 'Estado (UF)', tipo: 'text', grupo: 2 },
]

const INICIAL = {
  nome: '',
  email: '',
  telefone: '',
  cep: '',
  endereco: '',
  cidade: '',
  estado: '',
}

export default function Checkout() {
  const { itens, subtotal, frete, total, totalItens, limpar } = useCart()
  const navigate = useNavigate()
  const [dados, setDados] = useState(INICIAL)
  const [erros, setErros] = useState({})
  const [enviando, setEnviando] = useState(false)

  if (itens.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-5 pb-10 pt-32 text-center md:pt-40">
        <h1 className="font-display text-2xl font-bold text-tinta">
          Seu carrinho está vazio
        </h1>
        <p className="mt-2 text-tinta/60">
          Adicione produtos antes de finalizar a compra.
        </p>
        <Link
          to="/catalogo"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-marca px-6 py-3 font-semibold text-white hover:bg-marcaDark"
        >
          Ir ao catálogo
        </Link>
      </section>
    )
  }

  const atualizar = (nome, valor) => {
    setDados((d) => ({ ...d, [nome]: valor }))
    setErros((e) => ({ ...e, [nome]: undefined }))
  }

  const validar = () => {
    const novos = {}
    for (const campo of CAMPOS) {
      if (!dados[campo.nome].trim()) novos[campo.nome] = 'Campo obrigatório'
    }
    if (dados.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
      novos.email = 'E-mail inválido'
    }
    if (dados.estado && dados.estado.trim().length !== 2) {
      novos.estado = 'Use a sigla (2 letras)'
    }
    setErros(novos)
    return Object.keys(novos).length === 0
  }

  const finalizar = (e) => {
    e.preventDefault()
    if (!validar()) return
    setEnviando(true)

    // Checkout demonstrativo: simula o processamento do pedido.
    const pedido = {
      numero: `LM-${Date.now().toString().slice(-6)}`,
      nome: dados.nome,
      email: dados.email,
      total,
      itens: totalItens,
    }
    setTimeout(() => {
      limpar()
      navigate('/confirmacao', { state: { pedido } })
    }, 700)
  }

  const grupo1 = CAMPOS.filter((c) => c.grupo === 1)
  const grupo2 = CAMPOS.filter((c) => c.grupo === 2)

  const renderCampo = (campo) => (
    <div key={campo.nome} className={campo.full ? 'sm:col-span-2' : ''}>
      <label
        htmlFor={campo.nome}
        className="mb-1 block text-sm font-semibold text-tinta/80"
      >
        {campo.label}
      </label>
      <input
        id={campo.nome}
        type={campo.tipo}
        value={dados[campo.nome]}
        onChange={(e) => atualizar(campo.nome, e.target.value)}
        aria-invalid={Boolean(erros[campo.nome])}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-tinta focus:outline-none ${
          erros[campo.nome]
            ? 'border-marca'
            : 'border-tinta/15 focus:border-marca'
        }`}
      />
      {erros[campo.nome] && (
        <p className="mt-1 text-xs text-marca">{erros[campo.nome]}</p>
      )}
    </div>
  )

  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-28 md:px-8 md:pt-32">
      <h1 className="font-display text-3xl font-extrabold text-tinta md:text-4xl">
        Finalizar compra
      </h1>

      <form onSubmit={finalizar} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <fieldset className="rounded-2xl border border-areia bg-white p-6 shadow-card">
            <legend className="px-2 font-display text-lg font-bold text-tinta">
              Dados de contato
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {grupo1.map(renderCampo)}
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-areia bg-white p-6 shadow-card">
            <legend className="px-2 font-display text-lg font-bold text-tinta">
              Endereço de entrega
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {grupo2.map(renderCampo)}
            </div>
          </fieldset>
        </div>

        {/* Resumo do pedido */}
        <aside className="h-fit rounded-2xl border border-areia bg-white p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold text-tinta">
            Resumo do pedido
          </h2>
          <ul className="mt-4 divide-y divide-areia">
            {itens.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-areia">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-tinta px-1 text-xs font-bold text-white">
                    {item.quantidade}
                  </span>
                </div>
                <span className="flex-1 text-sm font-medium text-tinta">
                  {item.nome}
                </span>
                <span className="text-sm font-semibold text-tinta">
                  {formatarPreco(item.subtotal)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1 border-t border-areia pt-4 text-sm">
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
            type="submit"
            disabled={enviando}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-marca px-6 py-3.5 font-semibold text-white transition-colors hover:bg-marcaDark disabled:opacity-60"
          >
            <FiLock aria-hidden="true" />
            {enviando ? 'Processando…' : 'Pagar agora'}
          </button>
          <p className="mt-3 text-center text-xs text-tinta/50">
            Checkout demonstrativo — nenhum pagamento real é processado.
          </p>
          <Link
            to="/catalogo"
            className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-tinta/60 hover:text-marca"
          >
            <FiArrowLeft aria-hidden="true" /> Continuar comprando
          </Link>
        </aside>
      </form>
    </section>
  )
}
