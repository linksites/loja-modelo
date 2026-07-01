import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { MARCA, REDES, WHATSAPP_URL } from '../lib/site'

const ICONES = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-areia bg-tinta text-nevoa">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-xl font-bold uppercase tracking-tight">
            {MARCA.nome.split(' ')[0]}
            <span className="text-marca">.</span>
            <span className="text-nevoa/60">{MARCA.nome.split(' ')[1]}</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-nevoa/70">{MARCA.descricao}</p>
          <div className="mt-5 flex gap-3">
            {REDES.map((r) => {
              const Icon = ICONES[r.icon]
              return (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-nevoa/20 transition-colors hover:border-marca hover:text-marca"
                >
                  {Icon && <Icon aria-hidden="true" />}
                </a>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-nevoa/50">
            Navegação
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-nevoa/80">
            <li>
              <Link to="/" className="transition-colors hover:text-marca">
                Início
              </Link>
            </li>
            <li>
              <Link to="/catalogo" className="transition-colors hover:text-marca">
                Catálogo
              </Link>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-marca"
              >
                <FaWhatsapp aria-hidden="true" /> Atendimento
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-nevoa/50">
            Contato
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-nevoa/80">
            <li className="flex items-center gap-2">
              <FiMail aria-hidden="true" className="text-marca" /> {MARCA.email}
            </li>
            <li className="flex items-center gap-2">
              <FiPhone aria-hidden="true" className="text-marca" /> {MARCA.telefone}
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin aria-hidden="true" className="text-marca" /> {MARCA.endereco}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-nevoa/10 px-5 py-6 text-center text-xs text-nevoa/50">
        © {new Date().getFullYear()} {MARCA.nome}. Loja demonstrativa — sem
        transações reais.
      </div>
    </footer>
  )
}
