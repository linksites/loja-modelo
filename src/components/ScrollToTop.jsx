import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reposiciona a rolagem no topo a cada troca de rota. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
