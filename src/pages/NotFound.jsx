import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-10 pt-32 text-center md:pt-40">
      <p className="font-display text-6xl font-extrabold text-marca">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-tinta">
        Página não encontrada
      </h1>
      <p className="mt-2 text-tinta/60">
        O endereço que você tentou acessar não existe ou o produto saiu do
        catálogo.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-marca px-6 py-3 font-semibold text-white transition-colors hover:bg-marcaDark"
      >
        Voltar ao início
      </Link>
    </section>
  )
}
