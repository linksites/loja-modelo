import { FiMinus, FiPlus } from 'react-icons/fi'

/**
 * Controle de quantidade (– valor +). O mínimo é sempre 1; para remover um
 * item usa-se o botão de excluir no carrinho.
 */
export default function QuantityStepper({ quantidade, onChange, size = 'md' }) {
  const dim = size === 'sm' ? 'h-8 w-8 text-sm' : 'h-10 w-10'

  return (
    <div className="inline-flex items-center rounded-full border border-tinta/15 bg-white">
      <button
        type="button"
        onClick={() => onChange(quantidade - 1)}
        disabled={quantidade <= 1}
        aria-label="Diminuir quantidade"
        className={`${dim} grid place-items-center rounded-full text-tinta transition-colors hover:text-marca disabled:opacity-40`}
      >
        <FiMinus aria-hidden="true" />
      </button>
      <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">
        {quantidade}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantidade + 1)}
        aria-label="Aumentar quantidade"
        className={`${dim} grid place-items-center rounded-full text-tinta transition-colors hover:text-marca`}
      >
        <FiPlus aria-hidden="true" />
      </button>
    </div>
  )
}
