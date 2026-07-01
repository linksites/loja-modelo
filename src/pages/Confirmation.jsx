import { motion } from 'framer-motion'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { FiCheckCircle, FiMail } from 'react-icons/fi'
import { formatarPreco } from '../lib/format'

export default function Confirmation() {
  const { state } = useLocation()
  const pedido = state?.pedido

  // Acesso direto sem passar pelo checkout: volta para a home.
  if (!pedido) return <Navigate to="/" replace />

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-10 pt-32 text-center md:pt-40">
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="grid h-20 w-20 place-items-center rounded-full bg-oceano/10 text-oceano"
      >
        <FiCheckCircle aria-hidden="true" className="text-4xl" />
      </motion.span>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-tinta">
        Pedido confirmado!
      </h1>
      <p className="mt-3 text-tinta/70">
        Obrigado, <strong>{pedido.nome.split(' ')[0]}</strong>. Seu pedido foi
        registrado com sucesso.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-areia bg-white p-6 text-left shadow-card">
        <div className="flex items-center justify-between border-b border-areia pb-4">
          <span className="text-sm text-tinta/60">Número do pedido</span>
          <span className="font-display font-bold text-tinta">{pedido.numero}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-tinta/60">Itens</span>
          <span className="font-semibold text-tinta">{pedido.itens}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-tinta/60">Total pago</span>
          <span className="font-bold text-tinta">{formatarPreco(pedido.total)}</span>
        </div>
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-areia/60 px-3 py-2 text-sm text-tinta/70">
          <FiMail aria-hidden="true" className="text-marca" />
          Enviamos os detalhes para <strong>{pedido.email}</strong>.
        </p>
      </div>

      <Link
        to="/catalogo"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-marca px-6 py-3 font-semibold text-white transition-colors hover:bg-marcaDark"
      >
        Continuar comprando
      </Link>
    </section>
  )
}
