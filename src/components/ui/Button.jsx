import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Botão com micro-interação (Framer Motion) e três variantes visuais.
 * Renderiza como <button>, ou como <Link>/<a> quando recebe `to`/`href`.
 *
 * Variantes:
 *  - "solid"   → coral preenchido (ação principal)
 *  - "outline" → contorno escuro (ação secundária)
 *  - "ghost"   → sem fundo (ações discretas)
 */
export default function Button({
  children,
  variant = 'solid',
  className = '',
  to,
  href,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
    'tracking-wide transition-colors duration-200 disabled:opacity-50 ' +
    'disabled:cursor-not-allowed px-6 py-3'

  const variants = {
    solid: 'bg-marca text-white hover:bg-marcaDark shadow-card',
    outline: 'border border-tinta/20 text-tinta hover:border-marca hover:text-marca',
    ghost: 'text-tinta hover:text-marca',
  }

  const cls = `${base} ${variants[variant]} ${className}`
  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  }

  if (to) {
    const MotionLink = motion(Link)
    return (
      <MotionLink to={to} className={cls} {...motionProps} {...props}>
        {children}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a href={href} className={cls} {...motionProps} {...props}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button className={cls} {...motionProps} {...props}>
      {children}
    </motion.button>
  )
}
